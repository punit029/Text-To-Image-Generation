"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Wand2, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  // On mount, read stored theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({ title: "Error", description: "Please enter a prompt", variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate image");
      setImage(data.imageUrl);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black dark:bg-white min-h-screen relative transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 backdrop-blur-md bg-gray-900/70 dark:bg-gray-200/70 z-20 py-4 relative">
        <img
          src="/logo.webp"
          alt="Logo"
          className="absolute left-4 top-2 h-16 object-contain"
        />
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-white dark:text-black">
              Text-to-Image WebUI
            </h1>
            <p className="text-gray-300 dark:text-gray-700 text-sm mt-1">
              Transform your ideas into stunning images using AI.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-gray-800/50 dark:bg-gray-300/50 text-white dark:text-black transition"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-28">
        <Card className="max-w-lg mx-auto p-6 bg-gray-800/70 dark:bg-gray-100/70 border border-gray-700 dark:border-gray-300 shadow-xl transition-colors duration-300">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Describe the image…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-gray-900 dark:bg-white border-gray-700 dark:border-gray-300 text-white dark:text-black focus:ring-2 focus:ring-blue-500 flex-1 transition-colors duration-300"
                aria-label="Prompt input"
              />
              <Button
                onClick={generateImage}
                disabled={loading}
                className="mt-2 sm:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition transform duration-200 hover:scale-105"
              >
                {loading ? (
                  "Generating…"
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="animate-pulse bg-gray-700 dark:bg-gray-300 h-48 w-full max-w-2xl rounded-lg transition-colors duration-300" />
              </div>
            )}

            {image && !loading && (
              <div className="mt-8 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Generated"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </Card>
      </main>

      {/* Made By Section */}
      <aside className="fixed bottom-4 right-4 bg-gray-800/50 dark:bg-gray-200/50 text-gray-300 dark:text-gray-800 text-sm p-3 rounded space-y-1 z-20 text-right transition-colors duration-300">
        <div>Made by:</div>
        <div>Punit Kumar</div>
        <div>Tushar Sharma</div>
        <div>Vinay Kumar Jha</div>
        <div>Justin Tirkey</div>
      </aside>

      {/* Footer */}
      <footer className="fixed bottom-4 left-4 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-700 dark:border-gray-300 pt-2 z-20 transition-colors duration-300">
        © 2025 Global Institute of Technology, Jaipur — Mentor: Mr. Manish Kumar
        Jha.
      </footer>
    </div>
  );
}
