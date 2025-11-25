// Demo component to showcase all UI components
// This file demonstrates usage of all design system components

import React from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Input,
  Label,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "./index";

export function UIDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-4">UI Components Demo</h1>
        <p className="text-muted-foreground">
          Comprehensive demonstration of all available UI components using design tokens.
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Alerts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>
          
          <Alert variant="destructive">
            <AlertTitle>Error Alert</AlertTitle>
            <AlertDescription>Something went wrong! Please try again.</AlertDescription>
          </Alert>
          
          <Alert variant="warning">
            <AlertTitle>Warning Alert</AlertTitle>
            <AlertDescription>Please be careful with this action.</AlertDescription>
          </Alert>
          
          <Alert variant="success">
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>Operation completed successfully!</AlertDescription>
          </Alert>
          
          <Alert variant="info">
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>Here's some helpful information for you.</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area where you can put any information.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Another Card</CardTitle>
              <CardDescription>With different content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards are flexible containers for displaying grouped information.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Forms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Elements</h2>
        <Card>
          <CardHeader>
            <CardTitle>Sample Form</CardTitle>
            <CardDescription>Demonstration of form components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="select">Select Option</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit Form</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Interactive Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Components</h2>
        <div className="flex flex-wrap gap-4">
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Modal Title</ModalTitle>
                <ModalDescription>
                  This is a modal dialog. You can put any content here.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p>Modal content goes here.</p>
              </div>
              <ModalFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline">Open Dropdown</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
          </Dropdown>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Item</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* Typography & Design Tokens */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography & Design Tokens</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-primary">Primary color text</p>
              <p className="text-secondary">Secondary color text</p>
              <p className="text-accent">Accent color text</p>
              <p className="text-neutral">Neutral color text</p>
              <p className="font-heading text-xl">Heading font family</p>
              <p className="font-sans">Primary font family</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}