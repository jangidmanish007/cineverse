"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrailerButton({ onClick }) {
  return (
    <Button
      size="icon"
      className="bg-red-600 hover:bg-red-700 shadow-lg"
      onClick={onClick}
    >
      <Play className="w-5 h-5 fill-white" />
    </Button>
  );
}
