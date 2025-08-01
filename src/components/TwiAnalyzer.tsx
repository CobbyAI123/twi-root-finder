import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Languages, X } from "lucide-react";

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

// Enhanced Lemma dictionary with prefix/suffix information
const lemmaDict: Record<string, { lemma: string; prefix: string[]; suffix: string[] }> = {
  "mepɛ": {"lemma": "pɛ", "prefix": ["me"], "suffix": []},
  "wokɔ": {"lemma": "kɔ", "prefix": ["wo"], "suffix": []},
  "ɔbɛkɔ": {"lemma": "kɔ", "prefix": ["ɔ", "bɛ"], "suffix": []},
  "yɛnko": {"lemma": "kɔ", "prefix": ["yɛn"], "suffix": []},
  "rekɔ": {"lemma": "kɔ", "prefix": ["re"], "suffix": []},
  "mɛkɔ": {"lemma": "kɔ", "prefix": ["mɛ"], "suffix": []},
  "meyɛ": {"lemma": "yɛ", "prefix": ["me"], "suffix": []},
  "wokɔɔ": {"lemma": "kɔ", "prefix": ["wo"], "suffix": ["ɔɔ"]},
  "ɔdɔ": {"lemma": "dɔ", "prefix": ["ɔ"], "suffix": []},
  "ɔyɛ": {"lemma": "yɛ", "prefix": ["ɔ"], "suffix": []},
  "yɛyɛ": {"lemma": "yɛ", "prefix": ["yɛ"], "suffix": []},
  "ɔde": {"lemma": "de", "prefix": ["ɔ"], "suffix": []},
  "wɔyɛ": {"lemma": "yɛ", "prefix": ["wɔ"], "suffix": []},
  "mudi": {"lemma": "di", "prefix": ["mu"], "suffix": []},
  "wugye": {"lemma": "gye", "prefix": ["wu"], "suffix": []},
  "ɔbɛgye": {"lemma": "gye", "prefix": ["ɔ", "bɛ"], "suffix": []},
  "rebɔ": {"lemma": "bɔ", "prefix": ["re"], "suffix": []},
  "mɛma": {"lemma": "ma", "prefix": ["mɛ"], "suffix": []},
  "yɛbɛtɔ": {"lemma": "tɔ", "prefix": ["yɛ", "bɛ"], "suffix": []},
  "wokita": {"lemma": "kita", "prefix": ["wo"], "suffix": []},
  "abusua": {"lemma": "abusua", "prefix": [], "suffix": []},
  "ɔpanyin": {"lemma": "panyin", "prefix": ["ɔ"], "suffix": []},
  "aberewa": {"lemma": "berewa", "prefix": ["a"], "suffix": []},
  "agya": {"lemma": "agya", "prefix": [], "suffix": []},
  "ɛna": {"lemma": "ɛna", "prefix": [], "suffix": []},
  "baako": {"lemma": "ba", "prefix": [], "suffix": ["ako"]},
  "mpaninfoɔ": {"lemma": "panyin", "prefix": ["m"], "suffix": ["foɔ"]},
  "abofra": {"lemma": "ofra", "prefix": ["a"], "suffix": []},
  "anomaa": {"lemma": "nomaa", "prefix": ["a"], "suffix": []},
  "akyekyedeɛ": {"lemma": "kyekyedeɛ", "prefix": ["a"], "suffix": []},
  "atadeɛ": {"lemma": "tadeɛ", "prefix": ["a"], "suffix": []},
  "ɛpono": {"lemma": "pono", "prefix": ["ɛ"], "suffix": []},
  "krataa": {"lemma": "krataa", "prefix": [], "suffix": []},
  "nkyene": {"lemma": "kyene", "prefix": ["n"], "suffix": []},
  "nsuo": {"lemma": "suo", "prefix": ["n"], "suffix": []},
  "aduan": {"lemma": "duan", "prefix": ["a"], "suffix": []},
  "mmerɛ": {"lemma": "berɛ", "prefix": ["mm"], "suffix": []},
  "anɔpa": {"lemma": "anɔpa", "prefix": [], "suffix": []},
  "ɛberɛ": {"lemma": "berɛ", "prefix": ["ɛ"], "suffix": []},
  "nnɔnhwere": {"lemma": "ɔnhwere", "prefix": ["nn"], "suffix": []},
  "ntɛm": {"lemma": "tɛm", "prefix": ["n"], "suffix": []},
  "akyire": {"lemma": "kyire", "prefix": ["a"], "suffix": []},
  "ɛkan": {"lemma": "kan", "prefix": ["ɛ"], "suffix": []},
  "anka": {"lemma": "nka", "prefix": ["a"], "suffix": []},
  "abrɔ": {"lemma": "brɔ", "prefix": ["a"], "suffix": []},
  "nkuto": {"lemma": "kuto", "prefix": ["n"], "suffix": []},
  "aburo": {"lemma": "buro", "prefix": ["a"], "suffix": []},
  "duku": {"lemma": "duku", "prefix": [], "suffix": []},
  "asɔre": {"lemma": "sɔre", "prefix": ["a"], "suffix": []}
};

// Enhanced Lemmatization function using dictionary and fallback rules
const lemmatize = (word: string): [string, string] => {
  const ruleApplied: string[] = [];
  
  // Check if word exists in dictionary first
  if (lemmaDict[word]) {
    const entry = lemmaDict[word];
    const prefixRules = entry.prefix.length > 0 ? `Prefix removal: ${entry.prefix.join(', ')}` : '';
    const suffixRules = entry.suffix.length > 0 ? `Suffix removal: ${entry.suffix.join(', ')}` : '';
    const rules = [prefixRules, suffixRules].filter(Boolean).join('; ');
    
    return [entry.lemma, rules || 'Dictionary lookup'];
  }
  
  // Fallback to rule-based approach for words not in dictionary
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

// Main analysis function - now focused only on lemmatization
const analyzeWord = (word: string) => {
  const [result, rule] = lemmatize(word);
  return {
    original: word,
    result,
    rule,
    method: 'Lemmatization'
  };
};

export default function TwiAnalyzer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeWord> | null>(null);

  const handleAnalyze = useCallback(() => {
    if (input.trim()) {
      const lemmaRes = analyzeWord(input.trim().toLowerCase());
      setResult(lemmaRes);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult(null);
  }, []);

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
            Analyze Twi words using advanced lemmatization to discover their root forms
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
              {(input || result) && (
                <Button 
                  onClick={handleClear} 
                  variant="outline"
                  className="px-6 py-6 transition-[var(--transition-smooth)]"
                  aria-label="Clear input and results"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Advanced lemmatization results will be displayed automatically
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Original Word Display */}
            <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <label className="text-sm font-medium text-muted-foreground">Original Word</label>
                  <p className="text-2xl font-bold text-foreground">{result.original}</p>
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
                    <p className="text-lg font-semibold text-foreground">{result.result}</p>
                  </div>
                  <div className="p-3 bg-learning/5 rounded-lg border border-learning/20">
                    <label className="text-sm font-medium text-learning">Rules Applied</label>
                    <p className="text-sm text-foreground">{result.rule}</p>
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
                This tool performs advanced lemmatization on Twi words to find their accurate root forms.
              </p>
              <p className="text-xs text-muted-foreground">
                Uses an enhanced dictionary with detailed prefix and suffix mapping for precise linguistic analysis.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}