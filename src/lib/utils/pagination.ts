// Pagination Utilities
// Helpers for handling pagination in lists, tables, and data fetching

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginationResult<T = any> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startItem: number;
    endItem: number;
  };
}

export interface PaginationConfig {
  defaultLimit: number;
  maxLimit: number;
  showFirstLast: boolean;
  showPrevNext: boolean;
  siblingCount: number; // Number of page buttons to show on each side
}

export const DEFAULT_PAGINATION_CONFIG: PaginationConfig = {
  defaultLimit: 10,
  maxLimit: 100,
  showFirstLast: true,
  showPrevNext: true,
  siblingCount: 1,
};

// Parse and validate pagination parameters from request
export function parsePaginationParams(
  params: Record<string, any>,
  config: Partial<PaginationConfig> = {}
): Required<PaginationParams> {
  const finalConfig = { ...DEFAULT_PAGINATION_CONFIG, ...config };
  
  const page = Math.max(1, parseInt(params.page as string) || 1);
  const limit = Math.min(
    finalConfig.maxLimit,
    Math.max(1, parseInt(params.limit as string) || finalConfig.defaultLimit)
  );
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

// Create pagination result from data and parameters
export function createPaginationResult<T>(
  data: T[],
  totalItems: number,
  params: Required<PaginationParams>
): PaginationResult<T> {
  const { page, limit } = params;
  const totalPages = Math.ceil(totalItems / limit);
  
  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      startItem: totalItems === 0 ? 0 : (page - 1) * limit + 1,
      endItem: Math.min(page * limit, totalItems),
    },
  };
}

// Generate page numbers for pagination UI
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | "...")[] {
  if (totalPages <= 1) return [];

  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Calculate the range of pages to show
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: No dots needed (small number of pages)
  if (!shouldShowLeftDots && !shouldShowRightDots) {
    return range(1, totalPages);
  }

  // Case 2: Only right dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(1, Math.max(3, leftSiblingIndex + siblingCount));
    return [...leftRange, "...", lastPageIndex];
  }

  // Case 3: Only left dots
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(Math.min(totalPages - 2, rightSiblingIndex - siblingCount), totalPages);
    return [firstPageIndex, "...", ...rightRange];
  }

  // Case 4: Both dots
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }

  return [];
}

// Paginate array in memory (for client-side pagination)
export function paginateArray<T>(
  array: T[],
  page: number,
  limit: number
): PaginationResult<T> {
  const offset = (page - 1) * limit;
  const data = array.slice(offset, offset + limit);
  
  return createPaginationResult(data, array.length, { page, limit, offset });
}

// Create pagination URLs for navigation
export function createPaginationUrls(
  baseUrl: string,
  currentPage: number,
  totalPages: number,
  searchParams?: URLSearchParams
): {
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
  pages: Array<{ page: number; url: string; current: boolean }>;
} {
  const createUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams || {});
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  const pages = pageNumbers
    .filter((page): page is number => typeof page === 'number')
    .map(page => ({
      page,
      url: createUrl(page),
      current: page === currentPage,
    }));

  return {
    first: currentPage > 1 ? createUrl(1) : undefined,
    previous: currentPage > 1 ? createUrl(currentPage - 1) : undefined,
    next: currentPage < totalPages ? createUrl(currentPage + 1) : undefined,
    last: currentPage < totalPages ? createUrl(totalPages) : undefined,
    pages,
  };
}

// Database pagination helpers (for SQL queries)
export function getSqlPagination(params: Required<PaginationParams>): {
  limit: number;
  offset: number;
  sql: string;
} {
  const { limit, offset } = params;
  return {
    limit,
    offset,
    sql: `LIMIT ${limit} OFFSET ${offset}`,
  };
}

// Cursor-based pagination (for large datasets)
export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
  direction?: 'forward' | 'backward';
}

export interface CursorPaginationResult<T = any> {
  data: T[];
  nextCursor?: string;
  previousCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function createCursorPaginationResult<T extends { id: string }>(
  data: T[],
  limit: number,
  direction: 'forward' | 'backward' = 'forward'
): CursorPaginationResult<T> {
  const hasNextPage = data.length === limit + 1;
  const hasPreviousPage = direction === 'backward' && data.length > 0;

  // Remove the extra item used for determining hasNextPage
  if (hasNextPage) {
    data = direction === 'forward' ? data.slice(0, -1) : data.slice(1);
  }

  const nextCursor = hasNextPage && data.length > 0 
    ? data[data.length - 1].id 
    : undefined;
    
  const previousCursor = hasPreviousPage && data.length > 0 
    ? data[0].id 
    : undefined;

  return {
    data,
    nextCursor,
    previousCursor,
    hasNextPage,
    hasPreviousPage,
  };
}

// React hook for client-side pagination
export function usePagination<T>(
  items: T[],
  initialLimit: number = 10
): {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setLimit: (limit: number) => void;
  pagination: PaginationResult<T>['pagination'];
} {
  // This would need React imports in a real implementation
  // For now, providing the interface that components can use
  
  const currentPage = 1; // useState(1)
  const limit = initialLimit; // useState(initialLimit)
  
  const result = paginateArray(items, currentPage, limit);
  
  return {
    currentPage,
    totalPages: result.pagination.totalPages,
    paginatedItems: result.data,
    hasNextPage: result.pagination.hasNextPage,
    hasPreviousPage: result.pagination.hasPreviousPage,
    goToPage: (page: number) => { /* setCurrentPage(page) */ },
    nextPage: () => { /* setCurrentPage(p => p + 1) */ },
    previousPage: () => { /* setCurrentPage(p => p - 1) */ },
    setLimit: (newLimit: number) => { /* setLimit(newLimit); setCurrentPage(1) */ },
    pagination: result.pagination,
  };
}

// Search params helper for Next.js
export function getPaginationFromSearchParams(
  searchParams: URLSearchParams | { [key: string]: string | string[] | undefined },
  config?: Partial<PaginationConfig>
): Required<PaginationParams> {
  const params: Record<string, any> = {};
  
  if (searchParams instanceof URLSearchParams) {
    params.page = searchParams.get('page');
    params.limit = searchParams.get('limit');
  } else {
    params.page = searchParams.page;
    params.limit = searchParams.limit;
  }
  
  return parsePaginationParams(params, config);
}

// Format pagination info for display
export function formatPaginationInfo(pagination: PaginationResult<any>['pagination']): {
  summary: string;
  range: string;
  pages: string;
} {
  const { currentPage, totalPages, totalItems, startItem, endItem, itemsPerPage } = pagination;
  
  const summary = totalItems === 0 
    ? "No items found"
    : `Showing ${startItem.toLocaleString()} to ${endItem.toLocaleString()} of ${totalItems.toLocaleString()} items`;
  
  const range = totalItems === 0 
    ? "0 items"
    : `${startItem.toLocaleString()}-${endItem.toLocaleString()} of ${totalItems.toLocaleString()}`;
  
  const pages = totalPages === 0 
    ? "Page 0 of 0"
    : `Page ${currentPage.toLocaleString()} of ${totalPages.toLocaleString()}`;

  return { summary, range, pages };
}

// Validate pagination parameters
export function validatePaginationParams(
  params: PaginationParams,
  config?: Partial<PaginationConfig>
): { valid: boolean; errors: string[] } {
  const finalConfig = { ...DEFAULT_PAGINATION_CONFIG, ...config };
  const errors: string[] = [];

  if (params.page !== undefined) {
    if (params.page < 1) {
      errors.push("Page number must be greater than 0");
    }
  }

  if (params.limit !== undefined) {
    if (params.limit < 1) {
      errors.push("Limit must be greater than 0");
    }
    if (params.limit > finalConfig.maxLimit) {
      errors.push(`Limit cannot exceed ${finalConfig.maxLimit}`);
    }
  }

  if (params.offset !== undefined) {
    if (params.offset < 0) {
      errors.push("Offset must be greater than or equal to 0");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}