import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { userProfile } from "@/lib/mockData";

export const Topbar = () => (
  <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-border/60 px-6 py-3 flex items-center gap-4">
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input placeholder="Search jobs, skills, tests..." className="pl-9 bg-white/70 border-border/60 rounded-xl" />
    </div>
    <Button variant="ghost" size="icon" className="relative rounded-xl">
      <Bell className="w-5 h-5" />
      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
              {userProfile.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold leading-tight">{userProfile.name}</div>
            <div className="text-[10px] text-muted-foreground">{userProfile.title}</div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/">Logout</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
);
