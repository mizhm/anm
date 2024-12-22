"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function DynamicBreadCrumb() {
  const path = usePathname();
  const pathNames = path.split("/").filter((path) => path);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((pathName, index) => {
          const link =
            pathName[0].toUpperCase() + pathName.slice(1, pathName.length);
          if (index === pathNames.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{link}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <Link href={`/${pathNames.slice(0, index + 1).join("/")}`}>
                    <BreadcrumbLink>{link}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
