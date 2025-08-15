"use client";

import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOutClick = async () => {
    await authClient.signOut();
  };

  const getAvatarFallback = (name?: string | null) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.[0] || "";
    const lastInitial =
      nameParts.length > 1 ? nameParts[nameParts.length - 1]?.[0] || "" : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <header className="flex items-center justify-between border-b p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.image as string | undefined} />
                      <AvatarFallback>
                        {getAvatarFallback(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <span className="text-muted-foreground block text-xs">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        <LogInIcon />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/authentication">Fazer Login</Link>
                  </Button>
                </div>
              )}

              <Separator />

              <div className="flex flex-col gap-2">
                {user && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <Link href="/my-orders">
                      <PackageSearchIcon size={16} />
                      Meus Pedidos
                    </Link>
                  </Button>
                )}
              </div>

              {user && (
                <>
                  <Separator />
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={handleSignOutClick}
                  >
                    <LogOutIcon size={16} />
                    Sair
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};
