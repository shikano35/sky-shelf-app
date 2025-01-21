import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuItems } from "@/components/MenuItems";

type DrawerMenuProps = {
  toggleSidebar: () => void;
};

export function DrawerMenu({ toggleSidebar }: DrawerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  const handleClose = () => {
    setIsOpen(false);
    toggleSidebar();
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-8"
          onClick={handleToggle}
        >
          <Bars3Icon />
        </Button>
      </DrawerTrigger>
      <div className="md:hidden">
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <MenuItems onLinkClick={handleClose} />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}
