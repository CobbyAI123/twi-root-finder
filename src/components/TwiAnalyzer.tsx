import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Languages } from "lucide-react";

// Sample Twi words dataset
const twiWords = [
  'kɔ', 'kɔɔ', 'kɔeɛ', 'bɛkɔ', 'rekɔ', 'meyɛ', 'yɛɛ', 'medan', 'ɔmofie',
  'bɛyɛ', 'ɔyɛ', 'di', 'didii', 'redidi', 'bedi', 'mebisaeɛ', 'rekyerɛ',
  'kasa', 'ka', 'bɛka', 'rekasa', 'ɛkɔm', 'adidi', 'adwane', 'asikafoɔ',
  'mmoa', 'abɔfra', 'rekai', 'resa', 'tueɛ', 'ɔfaeɛ', 'nnua', 'osikanii',
  'sɔre3', 'nhunumuu', 'hwɛsofoc', 'anuanom', 'ɔdɔ', 'ɔbarima', 'mmrante3',
  'ɛkwan', 'Afuo', 'nwura', 'kutaeɛ', 'b3su', 'nsɛmbisa', 'nkwerɛeɛ', 'repia',
  'bɛba', 'nkasa', 'aba'
];

// Prefixes and suffixes
const prefixes = ['re', 'bɛ', 'me', 'mɛ', 'ɔmo', 'be', 'ɛ', 'o', 'wo', 'n', 'be', 'a', 'mo', 'ɔ', 'sɛm'];
const suffixes = ['foɔ', 'dii', 'di', 'nii', 'eɛ', 'so', 'nom', 'kuo', 'ɛ', 'ɔ', 'muu'];

// Lemma dictionary
const lemmaDict: Record<string, string> = {
  'kɔ': 'kɔ',
  'yɛ': 'yɛ',
  'di': 'di',
  'ka': 'ka',
  'kasa': 'kasa',
  'pɛ': 'pɛ',
  'fwe': 'fwe'
};

// Lemmatization function
const lemmatize = (word: string): [string, string] => {
  const ruleApplied: string[] = [];
  let processedWord = word;

  // Prefix transformations
  if (processedWord.startsWith('nn') && processedWord.length > 3) {
    processedWord = 'd' + processedWord.slice(2);
    ruleApplied.push('Prefix transformation: nn -> d');
  }

  if (processedWord.startsWith('mm') && processedWord.length > 3) {
    processedWord = 'ab' + processedWord.slice(2);
    ruleApplied.push('Prefix transformation: mm -> ab');
  }

  // Remove prefix
  for (const pre of prefixes) {
    if (processedWord.startsWith(pre) && processedWord.length > pre.length + 1) {
      processedWord = processedWord.slice(pre.length);
      ruleApplied.push(`Prefix removal: ${pre}`);
      break;
    }
  }

  // Remove suffix
  for (const suf of suffixes) {
    if (processedWord.endsWith(suf) && processedWord.length > suf.length + 1) {
      processedWord = processedWord.slice(0, -suf.length);
      ruleApplied.push(`Suffix removal: ${suf}`);
      break;
    }
  }

  return [processedWord, ruleApplied.length > 0 ? ruleApplied.join(', ') : 'None'];
};

// Stemming function
const stem = (word: string): [string, string] => {
  const ruleApplied: string[] = [];
  let processedWord = word;

  // Remove prefix
  for (const pre of prefixes) {
    if (processedWord.startsWith(pre) && processedWord.length > pre.length + 1) {
      processedWord = processedWord.slice(pre.length);
      ruleApplied.push(`Prefix removal: ${pre}`);
      break;
    }
  }

  // Remove suffix
  for (const suf of suffixes) {
    if (processedWord.endsWith(suf) && processedWord.length > suf.length + 1) {
      processedWord = processedWord.slice(0, -suf.length);
      ruleApplied.push(`Suffix removal: ${suf}`);
      break;
    }
  }

  return [processedWord, ruleApplied.length > 0 ? ruleApplied.join(', ') : 'None'];
};

// Main analysis function
const analyzeWord = (word: string, method: string) => {
  if (method === 'lemma') {
    const [result, rule] = lemmatize(word);
    return {
      original: word,
      result,
      rule,
      method: 'Lemmatization'
    };
  } else {
    const [result, rule] = stem(word);
    return {
      original: word,
      result,
      rule,
      method: 'Stemming'
    };
  }
};

export default function TwiAnalyzer() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{
    lemma: ReturnType<typeof analyzeWord>;
    stem: ReturnType<typeof analyzeWord>;
  } | null>(null);

  const handleAnalyze = useCallback(() => {
    if (input.trim()) {
      const lemmaRes = analyzeWord(input.trim().toLowerCase(), "lemma");
      const stemRes = analyzeWord(input.trim().toLowerCase(), "stem");
      setResults({
        lemma: lemmaRes,
        stem: stemRes
      });
    }
  }, [input]);

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
            Analyze Twi words using lemmatization or stemming to discover their root forms
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
                  placeholder="Enter a Twi word"
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

            <div className="text-sm text-muted-foreground">
              Both lemmatization and stemming results will be displayed automatically
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Original Word Display */}
            <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <label className="text-sm font-medium text-muted-foreground">Original Word</label>
                  <p className="text-2xl font-bold text-foreground">{results.lemma.original}</p>
                </div>
              </CardContent>
            </Card>

            {/* Lemmatization Results */}
            <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-5 h-5" />
                  Lemmatization Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <label className="text-sm font-medium text-primary">Lemma</label>
                    <p className="text-lg font-semibold text-foreground">{results.lemma.result}</p>
                  </div>
                  <div className="p-3 bg-learning/5 rounded-lg border border-learning/20">
                    <label className="text-sm font-medium text-learning">Rules Applied</label>
                    <p className="text-sm text-foreground">{results.lemma.rule}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stemming Results */}
            <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-5 h-5" />
                  Stemming Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                    <label className="text-sm font-medium text-secondary">Stem</label>
                    <p className="text-lg font-semibold text-foreground">{results.stem.result}</p>
                  </div>
                  <div className="p-3 bg-learning/5 rounded-lg border border-learning/20">
                    <label className="text-sm font-medium text-learning">Rules Applied</label>
                    <p className="text-sm text-foreground">{results.stem.rule}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <Card className="bg-accent/30 border-accent/40">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                This tool performs lemmatization and stemming on Twi words to find their root forms.
              </p>
              <p className="text-xs text-muted-foreground">
                Lemmatization provides more linguistically accurate roots, while stemming uses simpler rule-based removal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}