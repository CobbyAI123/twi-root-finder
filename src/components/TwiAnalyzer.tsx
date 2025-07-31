import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Languages } from "lucide-react";

const pluralRules = [
  { prefix: "mm", singularPrefix: { animate: "a", human: "ɔ", default: "a" } },
  { prefix: "nn", singularPrefix: { human: "o", default: "ɛ" } },
  { prefix: "n", singularPrefix: { default: "ɛ" } },
];

function analyzeWord(word: string, categoryHint = "") {
  const lower = word.toLowerCase();

  for (const rule of pluralRules) {
    if (lower.startsWith(rule.prefix)) {
      const root = lower.slice(rule.prefix.length);
      const singularPrefix =
        rule.singularPrefix[categoryHint as keyof typeof rule.singularPrefix] || rule.singularPrefix.default;
      const singular = singularPrefix + root;

      return {
        word,
        singular,
        prefix: singularPrefix,
        suffix: root,
        lemma: root,
        isPlural: true,
      };
    }
  }

  // If it's already likely a singular word, return it as-is
  return {
    word,
    singular: word,
    prefix: "",
    suffix: word,
    lemma: word,
    isPlural: false,
  };
}

export default function TwiAnalyzer() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeWord> | null>(null);

  const handleAnalyze = useCallback(() => {
    if (input.trim()) {
      const res = analyzeWord(input.trim().toLowerCase(), category);
      setResult(res);
    }
  }, [input, category]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              Twi Word Analyzer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Analyze Twi words to discover their singular forms, prefixes, and linguistic structure
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-[var(--shadow-soft)] border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="w-5 h-5" />
              Word Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter Twi word (plural or singular)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg py-6 transition-[var(--transition-smooth)] focus:shadow-[var(--shadow-focus)]"
                  aria-label="Twi word input"
                />
              </div>
              <Button 
                onClick={handleAnalyze} 
                className="px-8 py-6 text-lg font-medium transition-[var(--transition-smooth)]"
                disabled={!input.trim()}
              >
                Analyze
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="category" className="text-sm font-medium text-muted-foreground">
                Category (optional):
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Auto-detect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Auto-detect</SelectItem>
                  <SelectItem value="human">Human</SelectItem>
                  <SelectItem value="animate">Animate</SelectItem>
                  <SelectItem value="inanimate">Inanimate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="w-5 h-5" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-accent rounded-lg">
                    <label className="text-sm font-medium text-accent-foreground">Original Word</label>
                    <p className="text-lg font-semibold text-foreground">{result.word}</p>
                  </div>
                  
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <label className="text-sm font-medium text-primary">Singular Form</label>
                    <p className="text-lg font-semibold text-foreground">{result.singular}</p>
                  </div>
                  
                  <div className="p-3 bg-educational/5 rounded-lg border border-educational/20">
                    <label className="text-sm font-medium text-educational">Lemma (Root)</label>
                    <p className="text-lg font-semibold text-foreground">{result.lemma}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-learning/5 rounded-lg border border-learning/20">
                    <label className="text-sm font-medium text-learning">Prefix</label>
                    <p className="text-lg font-semibold text-foreground">
                      {result.prefix || <span className="text-muted-foreground italic">None</span>}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-secondary rounded-lg">
                    <label className="text-sm font-medium text-secondary-foreground">Suffix/Root</label>
                    <p className="text-lg font-semibold text-foreground">{result.suffix}</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <label className="text-sm font-medium text-muted-foreground">Form Type</label>
                    <p className="text-lg font-semibold text-foreground">
                      {result.isPlural ? "Plural" : "Singular"}
                    </p>
                  </div>
                </div>
              </div>

              {result.isPlural && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary">
                    <strong>Transformation:</strong> {result.word} → {result.singular}
                    <br />
                    <span className="text-muted-foreground">
                      Removed plural prefix "{result.word.slice(0, result.word.length - result.suffix.length)}" 
                      and added singular prefix "{result.prefix}"
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="bg-accent/30 border-accent/40">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                This tool analyzes Twi words to identify their grammatical structure and singular forms.
              </p>
              <p className="text-xs text-muted-foreground">
                Supports common plural patterns: mm-, nn-, and n- prefixes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}