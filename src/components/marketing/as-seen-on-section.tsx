"use client";

import React from "react";

export function AsSeenOnSection() {
  return (
    <section className="py-section-mobile md:py-section">
      <div className="container mx-auto px-container-mobile md:px-container max-w-page">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground mb-8">As Seen On</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["logo1.png", "logo2.png", "logo3.png"].map((logo) => (
              <div
                key={logo}
                className="h-32 w-60 rounded-lg flex items-center justify-center bg-surface/80 shadow-sm transition-all duration-200 hover:scale-105"
              >
                <img
                  src={`/${logo}`}
                  alt={`Featured on ${logo}`}
                  className="h-28 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
