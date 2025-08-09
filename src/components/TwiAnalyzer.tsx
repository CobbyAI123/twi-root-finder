import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Languages, X } from "lucide-react";

// Comprehensive Twi words dataset
const twiWords = [
  'kɔe', 'kɔ', 'rekɔ', 'bae', 'ba', 'reba', 'didii', 'di', 'redidi', 'suree', 'su', 'resu',
  'penee', 'pene', 'repene', 'tenaa', 'tena', 'retena', 'soaa', 'sua', 'resua', 'sereee',
  'sere', 'resere', 'dweene', 'dwene', 'redwene', 'kae', 'ka', 'reka', 'tee', 'te', 'rete',
  'twene', 'twɛn', 'retwɛn', 'gyinaa', 'gyina', 'regyina', 'hyɛɛ', 'hyɛ', 'rehyɛ', 'kɔree',
  'tu', 'retu', 'yɛɛ', 'yɛ', 'reyɛ', 'tuu', 'ɔdɔ', 'adwuma', 'anɔpa', 'awia', 'anadwo',
  'ɛda', 'adaka', 'nkuto', 'nsuo', 'aduan', 'akoma', 'adwen', 'fie', 'kurom', 'abɔfra',
  'agya', 'ɛna', 'akyiri', 'anim', 'anomaa', 'dua', 'asɔre', 'sukuu', 'krataa', 'ɛpono',
  'kɔtɔ', 'nkɔnsɔnkɔnsɔn', 'nsatea', 'nsa', 'ɛnan', 'asɛm', 'agorɔ', 'nkɔmmɔ', 'ɔdɔfoɔ',
  'ɔkyerɛkyerɛni', 'ɔpanyin', 'ɔko', 'akatua', 'sika', 'asukɔ', 'ɛpo', 'ɔwɔ', 'ɛsono',
  'akokɔ', 'adanko', 'aboa', 'abusua', 'akɔɔ', 'ɔbɔɔ', 'madie', 'ɔfaa', 'nkasam', 'ayɛe',
  'ɛkɔm', 'dinnie', 'ɔkɔɔ', 'mpɛa', 'atwɛn', 'ɔdwene', 'makyɛrw', 'ɛtuaa', 'nkɔmfoɔ',
  'agyee', 'ɔtenaa', 'dikae', 'ɛbɔɔ', 'makɔm', 'ɔtwen', 'ɛfaa', 'nkyerɛkye', 'mabɔɔ',
  'ɔdie', 'akasam', 'ɛyɛe', 'difaa', 'nbɔm', 'ɛdie', 'makasam', 'ɔyɛe', 'dikɔɔ', 'ɛtwen',
  'nfam', 'abɔɔ', 'ɔkasam', 'mayɛe', 'ditwen', 'nkɔm', 'ɛkasam',
  // Original words maintained
  'kɔɔ', 'kɔeɛ', 'bɛkɔ', 'meyɛ', 'medan', 'ɔmofie', 'bɛyɛ', 'ɔyɛ', 'bedi', 'mebisaeɛ',
  'rekyerɛ', 'kasa', 'bɛka', 'rekasa', 'adidi', 'adwane', 'asikafoɔ', 'mmoa', 'rekai',
  'resa', 'tueɛ', 'ɔfaeɛ', 'nnua', 'osikanii', 'sɔre3', 'nhunumuu', 'hwɛsofoc', 'anuanom',
  'ɔbarima', 'mmrante3', 'ɛkwan', 'Afuo', 'nwura', 'kutaeɛ', 'b3su', 'nsɛmbisa',
  'nkwerɛeɛ', 'repia', 'bɛba', 'nkasa', 'aba'
];

// Comprehensive Twi prefixes and suffixes
const prefixes = ['re', 'bɛ', 'me', 'mɛ', 'ɔmo', 'be', 'ɛ', 'o', 'wo', 'n', 'a', 'mo', 'ɔ', 'sɛm', 'ma', 'di'];
const suffixes = ['foɔ', 'dii', 'di', 'nii', 'eɛ', 'so', 'nom', 'kuo', 'ɛ', 'ɔ', 'muu', 'e', 'a', 'm', 'no', 'ni', 'kye', 'w'];

// Enhanced Lemma dictionary with comprehensive prefix/suffix mappings
const lemmaDict: Record<string, { lemma: string; prefix: string[]; suffix: string[] }> = {
  // From user's comprehensive dataset
  "kɔe": {"lemma": "kɔe", "prefix": [], "suffix": []},
  "kɔ": {"lemma": "kɔ", "prefix": [], "suffix": []},
  "rekɔ": {"lemma": "kɔ", "prefix": ["re"], "suffix": []},
  "bae": {"lemma": "bae", "prefix": [], "suffix": []},
  "ba": {"lemma": "ba", "prefix": [], "suffix": []},
  "reba": {"lemma": "ba", "prefix": ["re"], "suffix": []},
  "didii": {"lemma": "didii", "prefix": [], "suffix": []},
  "di": {"lemma": "di", "prefix": [], "suffix": []},
  "redidi": {"lemma": "didi", "prefix": ["re"], "suffix": []},
  "suree": {"lemma": "suree", "prefix": [], "suffix": []},
  "su": {"lemma": "su", "prefix": [], "suffix": []},
  "resu": {"lemma": "su", "prefix": ["re"], "suffix": []},
  "penee": {"lemma": "penee", "prefix": [], "suffix": []},
  "pene": {"lemma": "pene", "prefix": [], "suffix": []},
  "repene": {"lemma": "pene", "prefix": ["re"], "suffix": []},
  "tenaa": {"lemma": "tenaa", "prefix": [], "suffix": []},
  "tena": {"lemma": "tena", "prefix": [], "suffix": []},
  "retena": {"lemma": "tena", "prefix": ["re"], "suffix": []},
  "soaa": {"lemma": "soaa", "prefix": [], "suffix": []},
  "sua": {"lemma": "sua", "prefix": [], "suffix": []},
  "resua": {"lemma": "sua", "prefix": ["re"], "suffix": []},
  "sereee": {"lemma": "sereee", "prefix": [], "suffix": []},
  "sere": {"lemma": "sere", "prefix": [], "suffix": []},
  "resere": {"lemma": "sere", "prefix": ["re"], "suffix": []},
  "dweene": {"lemma": "dweene", "prefix": [], "suffix": []},
  "dwene": {"lemma": "dwene", "prefix": [], "suffix": []},
  "redwene": {"lemma": "dwene", "prefix": ["re"], "suffix": []},
  "kae": {"lemma": "kae", "prefix": [], "suffix": []},
  "ka": {"lemma": "ka", "prefix": [], "suffix": []},
  "reka": {"lemma": "ka", "prefix": ["re"], "suffix": []},
  "tee": {"lemma": "tee", "prefix": [], "suffix": []},
  "te": {"lemma": "te", "prefix": [], "suffix": []},
  "rete": {"lemma": "te", "prefix": ["re"], "suffix": []},
  "twene": {"lemma": "twene", "prefix": [], "suffix": []},
  "twɛn": {"lemma": "twɛn", "prefix": [], "suffix": []},
  "retwɛn": {"lemma": "twɛn", "prefix": ["re"], "suffix": []},
  "gyinaa": {"lemma": "gyinaa", "prefix": [], "suffix": []},
  "gyina": {"lemma": "gyina", "prefix": [], "suffix": []},
  "regyina": {"lemma": "gyina", "prefix": ["re"], "suffix": []},
  "hyɛɛ": {"lemma": "hyɛɛ", "prefix": [], "suffix": []},
  "hyɛ": {"lemma": "hyɛ", "prefix": [], "suffix": []},
  "rehyɛ": {"lemma": "hyɛ", "prefix": ["re"], "suffix": []},
  "kɔree": {"lemma": "kɔree", "prefix": [], "suffix": []},
  "tu": {"lemma": "tu", "prefix": [], "suffix": []},
  "retu": {"lemma": "tu", "prefix": ["re"], "suffix": []},
  "yɛɛ": {"lemma": "yɛɛ", "prefix": [], "suffix": []},
  "yɛ": {"lemma": "yɛ", "prefix": [], "suffix": []},
  "reyɛ": {"lemma": "yɛ", "prefix": ["re"], "suffix": []},
  "tuu": {"lemma": "tuu", "prefix": [], "suffix": []},
  "ɔdɔ": {"lemma": "ɔdɔ", "prefix": [], "suffix": []},
  "adwuma": {"lemma": "dwuma", "prefix": ["a"], "suffix": []},
  "anɔpa": {"lemma": "nɔpa", "prefix": ["a"], "suffix": []},
  "awia": {"lemma": "wia", "prefix": ["a"], "suffix": []},
  "anadwo": {"lemma": "nadwo", "prefix": ["a"], "suffix": []},
  "ɛda": {"lemma": "da", "prefix": ["ɛ"], "suffix": []},
  "adaka": {"lemma": "daka", "prefix": ["a"], "suffix": []},
  "nkuto": {"lemma": "kuto", "prefix": ["n"], "suffix": []},
  "nsuo": {"lemma": "suo", "prefix": ["n"], "suffix": []},
  "aduan": {"lemma": "duan", "prefix": ["a"], "suffix": []},
  "akoma": {"lemma": "koma", "prefix": ["a"], "suffix": []},
  "adwen": {"lemma": "dwen", "prefix": ["a"], "suffix": []},
  "fie": {"lemma": "fie", "prefix": [], "suffix": []},
  "kurom": {"lemma": "kurom", "prefix": [], "suffix": []},
  "abɔfra": {"lemma": "bɔfra", "prefix": ["a"], "suffix": []},
  "agya": {"lemma": "gya", "prefix": ["a"], "suffix": []},
  "ɛna": {"lemma": "na", "prefix": ["ɛ"], "suffix": []},
  "akyiri": {"lemma": "kyiri", "prefix": ["a"], "suffix": []},
  "anim": {"lemma": "nim", "prefix": ["a"], "suffix": []},
  "anomaa": {"lemma": "nomaa", "prefix": ["a"], "suffix": []},
  "dua": {"lemma": "dua", "prefix": [], "suffix": []},
  "asɔre": {"lemma": "sɔre", "prefix": ["a"], "suffix": []},
  "sukuu": {"lemma": "sukuu", "prefix": [], "suffix": []},
  "krataa": {"lemma": "krataa", "prefix": [], "suffix": []},
  "ɛpono": {"lemma": "po", "prefix": ["ɛ"], "suffix": ["no"]},
  "kɔtɔ": {"lemma": "kɔtɔ", "prefix": [], "suffix": []},
  "nkɔnsɔnkɔnsɔn": {"lemma": "kɔnsɔnkɔnsɔn", "prefix": ["n"], "suffix": []},
  "nsatea": {"lemma": "satea", "prefix": ["n"], "suffix": []},
  "nsa": {"lemma": "sa", "prefix": ["n"], "suffix": []},
  "ɛnan": {"lemma": "nan", "prefix": ["ɛ"], "suffix": []},
  "asɛm": {"lemma": "sɛm", "prefix": ["a"], "suffix": []},
  "agorɔ": {"lemma": "gorɔ", "prefix": ["a"], "suffix": []},
  "nkɔmmɔ": {"lemma": "kɔmmɔ", "prefix": ["n"], "suffix": []},
  "ɔdɔfoɔ": {"lemma": "dɔfoɔ", "prefix": ["ɔ"], "suffix": []},
  "ɔkyerɛkyerɛni": {"lemma": "kyerɛkyerɛ", "prefix": ["ɔ"], "suffix": ["ni"]},
  "ɔpanyin": {"lemma": "panyin", "prefix": ["ɔ"], "suffix": []},
  "ɔko": {"lemma": "ko", "prefix": ["ɔ"], "suffix": []},
  "akatua": {"lemma": "katua", "prefix": ["a"], "suffix": []},
  "sika": {"lemma": "sika", "prefix": [], "suffix": []},
  "asukɔ": {"lemma": "sukɔ", "prefix": ["a"], "suffix": []},
  "ɛpo": {"lemma": "po", "prefix": ["ɛ"], "suffix": []},
  "ɔwɔ": {"lemma": "wɔ", "prefix": ["ɔ"], "suffix": []},
  "ɛsono": {"lemma": "so", "prefix": ["ɛ"], "suffix": ["no"]},
  "akokɔ": {"lemma": "kokɔ", "prefix": ["a"], "suffix": []},
  "adanko": {"lemma": "danko", "prefix": ["a"], "suffix": []},
  "aboa": {"lemma": "boa", "prefix": ["a"], "suffix": []},
  "abusua": {"lemma": "busua", "prefix": ["a"], "suffix": []},
  // Additional table mappings from second dataset
  "akɔɔ": {"lemma": "kɔ", "prefix": ["a"], "suffix": ["ɔ"]},
  "ɔbɔɔ": {"lemma": "bɔ", "prefix": ["ɔ"], "suffix": ["ɔ"]},
  "madie": {"lemma": "di", "prefix": ["ma"], "suffix": ["e"]},
  "ɔfaa": {"lemma": "fa", "prefix": ["ɔ"], "suffix": ["a"]},
  "nkasam": {"lemma": "kasa", "prefix": ["n"], "suffix": ["m"]},
  "ayɛe": {"lemma": "yɛ", "prefix": ["a"], "suffix": ["e"]},
  "ɛkɔm": {"lemma": "kɔ", "prefix": ["ɛ"], "suffix": ["m"]},
  "dinnie": {"lemma": "nni", "prefix": ["di"], "suffix": ["e"]},
  "ɔkɔɔ": {"lemma": "kɔ", "prefix": ["ɔ"], "suffix": ["ɔ"]},
  "mpɛa": {"lemma": "pɛ", "prefix": ["m"], "suffix": ["a"]},
  "atwɛn": {"lemma": "twɛ", "prefix": ["a"], "suffix": ["n"]},
  "ɔdwene": {"lemma": "dwen", "prefix": ["ɔ"], "suffix": ["e"]},
  "makyɛrw": {"lemma": "kyerɛ", "prefix": ["ma"], "suffix": ["w"]},
  "ɛtuaa": {"lemma": "tua", "prefix": ["ɛ"], "suffix": ["a"]},
  "nkɔmfoɔ": {"lemma": "kɔm", "prefix": ["n"], "suffix": ["foɔ"]},
  "agyee": {"lemma": "gye", "prefix": ["a"], "suffix": ["e"]},
  "ɔtenaa": {"lemma": "tena", "prefix": ["ɔ"], "suffix": ["a"]},
  "dikae": {"lemma": "ka", "prefix": ["di"], "suffix": ["e"]},
  "ɛbɔɔ": {"lemma": "bɔ", "prefix": ["ɛ"], "suffix": ["ɔ"]},
  "makɔm": {"lemma": "kɔ", "prefix": ["ma"], "suffix": ["m"]},
  "ɔtwen": {"lemma": "twe", "prefix": ["ɔ"], "suffix": ["n"]},
  "ɛfaa": {"lemma": "fa", "prefix": ["ɛ"], "suffix": ["a"]},
  "nkyerɛkye": {"lemma": "kyerɛ", "prefix": ["n"], "suffix": ["kye"]},
  "mabɔɔ": {"lemma": "bɔ", "prefix": ["ma"], "suffix": ["ɔ"]},
  "ɔdie": {"lemma": "di", "prefix": ["ɔ"], "suffix": ["e"]},
  "akasam": {"lemma": "kasa", "prefix": ["a"], "suffix": ["m"]},
  "ɛyɛe": {"lemma": "yɛ", "prefix": ["ɛ"], "suffix": ["e"]},
  "difaa": {"lemma": "fa", "prefix": ["di"], "suffix": ["a"]},
  "nbɔm": {"lemma": "bɔ", "prefix": ["n"], "suffix": ["m"]},
  "ɛdie": {"lemma": "di", "prefix": ["ɛ"], "suffix": ["e"]},
  "makasam": {"lemma": "kasa", "prefix": ["ma"], "suffix": ["m"]},
  "ɔyɛe": {"lemma": "yɛ", "prefix": ["ɔ"], "suffix": ["e"]},
  "dikɔɔ": {"lemma": "kɔ", "prefix": ["di"], "suffix": ["ɔ"]},
  "ɛtwen": {"lemma": "twe", "prefix": ["ɛ"], "suffix": ["n"]},
  "nfam": {"lemma": "fa", "prefix": ["n"], "suffix": ["m"]},
  "abɔɔ": {"lemma": "bɔ", "prefix": ["a"], "suffix": ["ɔ"]},
  "ɔkasam": {"lemma": "kasa", "prefix": ["ɔ"], "suffix": ["m"]},
  "mayɛe": {"lemma": "yɛ", "prefix": ["ma"], "suffix": ["e"]},
  "ditwen": {"lemma": "twe", "prefix": ["di"], "suffix": ["n"]},
  "nkɔm": {"lemma": "kɔ", "prefix": ["n"], "suffix": ["m"]},
  "ɛkasam": {"lemma": "kasa", "prefix": ["ɛ"], "suffix": ["m"]},
  // Original preserved mappings
  "mepɛ": {"lemma": "pɛ", "prefix": ["me"], "suffix": []},
  "wokɔ": {"lemma": "kɔ", "prefix": ["wo"], "suffix": []},
  "ɔbɛkɔ": {"lemma": "kɔ", "prefix": ["ɔ", "bɛ"], "suffix": []},
  "yɛnko": {"lemma": "kɔ", "prefix": ["yɛn"], "suffix": []},
  "mɛkɔ": {"lemma": "kɔ", "prefix": ["mɛ"], "suffix": []},
  "meyɛ": {"lemma": "yɛ", "prefix": ["me"], "suffix": []},
  "wokɔɔ": {"lemma": "kɔ", "prefix": ["wo"], "suffix": ["ɔɔ"]},
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
  "aberewa": {"lemma": "berewa", "prefix": ["a"], "suffix": []},
  "baako": {"lemma": "ba", "prefix": [], "suffix": ["ako"]},
  "mpaninfoɔ": {"lemma": "panyin", "prefix": ["m"], "suffix": ["foɔ"]},
  "abofra": {"lemma": "ofra", "prefix": ["a"], "suffix": []},
  "akyekyedeɛ": {"lemma": "kyekyedeɛ", "prefix": ["a"], "suffix": []},
  "atadeɛ": {"lemma": "tadeɛ", "prefix": ["a"], "suffix": []},
  "nkyene": {"lemma": "kyene", "prefix": ["n"], "suffix": []},
  "mmerɛ": {"lemma": "berɛ", "prefix": ["mm"], "suffix": []},
  "ɛberɛ": {"lemma": "berɛ", "prefix": ["ɛ"], "suffix": []},
  "nnɔnhwere": {"lemma": "ɔnhwere", "prefix": ["nn"], "suffix": []},
  "ntɛm": {"lemma": "tɛm", "prefix": ["n"], "suffix": []},
  "akyire": {"lemma": "kyire", "prefix": ["a"], "suffix": []},
  "ɛkan": {"lemma": "kan", "prefix": ["ɛ"], "suffix": []},
  "anka": {"lemma": "nka", "prefix": ["a"], "suffix": []},
  "abrɔ": {"lemma": "brɔ", "prefix": ["a"], "suffix": []},
  "aburo": {"lemma": "buro", "prefix": ["a"], "suffix": []},
  "duku": {"lemma": "duku", "prefix": [], "suffix": []},
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

// Main analysis function - focused only on lemmatization
const analyzeWord = (word: string) => {
  const [lemmaResult, rule] = lemmatize(word);
  return {
    original: word,
    result: lemmaResult,
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