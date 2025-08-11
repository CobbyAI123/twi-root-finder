import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Languages, X, List, ChevronRight } from "lucide-react";

// Comprehensive Twi words dataset
const twiWords = [
  'kɔ', 'kɔɔ', 'kɔeɛ', 'bɛkɔ', 'rekɔ', 'meyɛ', 'yɛɛ', 'medan', 'ɔmofie',
  'bɛyɛ', 'ɔyɛ', 'di', 'didii', 'redidi', 'bedi', 'mebisaeɛ', 'rekyerɛ',
  'kasa', 'ka', 'bɛka', 'rekasa', 'ɛkɔm', 'adidi', 'adwane', 'asikafoɔ',
  'mmoa', 'abɔfra', 'rekai', 'resa', 'tueɛ', 'ɔfaeɛ', 'nnua', 'osikanii',
  'sɔre3', 'nhunumuu', 'hwɛsofoc', 'anuanom', 'ɔdɔ', 'ɔbarima', 'mmrante3',
  'ɛkwan', 'Afuo', 'nwura', 'kutaeɛ', 'b3su', 'nsɛmbisa', 'nkwerɛeɛ', 'repia',
  'bɛba', 'nkasa','aba', 'bebisa', 'bebisaa', 'bebrɛ', 'bebɔ', 'bebɔa', 'bebɔne',
  'bebɔneeɛ', 'bebɔɔa', 'bebɔɔoo', 'bebɛ', 'bebɛyɛ', 'bedaa', 'bedi', 'bedioo', 
  'bedwene', 'bedɔ', 'befa', 'befrɛ', 'befrɛa', 'beguoo', 'behunu', 'behyɛ', 
  'behyɛeɛ', 'beka', 'bekasa', 'bekasaeɛ', 'bekyerɛ', 'bekɔ', 'bekɔdaeɛ', 'bekɔfa',
  'bekɔhwɛ', 'bekɔtɔ', 'bekɔyɛ', 'bema', 'benom', 'benomeɛ', 'bepɛ', 'beresua', 
  'besere', 'besii', 'beso', 'besɔ', 'besɔa', 'besɔeɛ', 'beto', 'betuaoo', 'betɔ', 
  'betɔnna', 'beyɛ', 'betɔnneɛ', 'bewɔabaa','bewɔabaeɛ', 'beyɛa', 'beyɛnkɔa',
  'beyɛrebaa', 'beyɛɛ', 'bɛbisa', 'bɛbo', 'bɛbɔ', 'bɛbɔneeɛ', 'bɛbɔɔ', 'bɛbɛ',
  'bɛbɛa', 'bɛbɛyɛ', 'bɛda', 'bɛdweneeɛ', 'bɛdweneoo', 'bɛfa', 'bɛfaa', 'bɛfrɛeɛ',
  'bɛgu', 'bɛgye', 'bɛgyeeɛ', 'bɛhunu', 'bɛhyɛ', 'bɛhyɛeɛ', 'bɛka', 'bɛkaoo',
  'bɛkasa', 'bɛkyerɛ', 'bɛkyerɛa', 'bɛkyerɛoo', 'bɛkɔda', 'bɛkɔtɔa', 'bɛkɔtɔeɛ',
  'bɛnante', 'bɛnom', 'bɛreba', 'bɛresua', 'bɛresuaoo', 'bɛsere', 'bɛsereeɛ',
  'bɛsii', 'bɛsiieɛ', 'bɛsoeɛ', 'bɛto', 'bɛtoeɛ', 'bɛtua', 'bɛtuaoo', 'bɛwɔaba',
  'bɛwɔabaeɛ', 'bɛyɛ', 'bɛyɛnkɔ', 'bɛyɛre', 'bɛyɛrea', 'bɛyɛreba', 'bɛyɛɛ',
  'bɛyɛɛoo', 'mebisa', 'mebo', 'mebooo', 'mebrɛ', 'mebrɛa', 'mebɔ', 'mebɔne',
  'mebɔneeɛ', 'mebɔɔ', 'mebɛ', 'mebɛyɛ', 'meda', 'medaa', 'medioo', 'medweneoo',
  'medɔ', 'mefa', 'mefaeɛ', 'mefrɛ', 'mefrɛoo', 'megyea', 'megyeoo', 'mehunu',
  'mehunua', 'mehunuoo', 'mehyɛ', 'mekyerɛ', 'mekɔfa', 'mekɔhwɛ', 'mekɔtɔ',
  'mekɔtɔeɛ', 'mekɔyɛ', 'menanteoo', 'menom', 'menomeɛ', 'menomoo', 'mepɛeɛ',
  'meresua', 'mesere', 'meserea', 'mesii', 'meso', 'mesua', 'mesuaeɛ', 'metenaa',
  'metuaa', 'metwɛn', 'metɔ', 'meyɛ', 'meyɛnkɔeɛ', 'meyɛnkɔoo', 'meyɛoo',
  'meyɛre', 'meyɛreba', 'meyɛrebaa', 'meyɛrebaoo', 'meyɛɛ', 'meyɛɛeɛ',
  'mɛbisa', 'mɛbisaeɛ', 'mɛbo', 'mɛbrɛoo', 'mɛbɔ', 'mɛbɔneoo', 'mɛbɔɔa',
  'mɛbɔɔeɛ', 'mɛbɛ', 'mɛbɛa', 'mɛda', 'mɛdi', 'mɛdwene', 'mɛfrɛ', 'mɛfrɛa',
  'mɛfrɛeɛ', 'mɛguoo', 'mɛgye', 'mɛhunu', 'mɛhyɛ', 'mɛhyɛa', 'mɛka', 'mɛkasa',
  'mɛkasaoo', 'mɛkyerɛeɛ', 'mɛkɔ', 'mɛkɔfa', 'mɛkɔhwɛ', 'mɛkɔoo', 'mɛkɔtɔ',
  'mɛnom', 'mɛpɛ', 'mɛpɛoo', 'mɛreba', 'mɛrebaeɛ', 'mɛrebaoo', 'mɛresua',
  'mɛresuaa', 'mɛsere', 'mɛsii', 'mɛsɔa', 'mɛtena', 'mɛto', 'mɛtɔnn', 'mɛtɔnna',
  'mɛwɔabaa', 'mɛyɛ', 'mɛyɛnkɔa', 'mɛyɛoo', 'mɛyɛreba', 'mɛyɛreeɛ', 'rebisa',
  'rebisaa', 'rebisaeɛ', 'rebo', 'reboa', 'reboeɛ', 'rebrɛ', 'rebɔa', 'rebɔne',
  'rebɔɔeɛ', 'rebɛyɛ', 'rebɛyɛa', 'rebɛyɛoo', 'reda', 'redaa', 'redwene', 'refa',
  'refaoo', 'refrɛ', 'regu', 'regueɛ', 'reguoo', 'regyeoo', 'rehunu', 'rehyɛ',
  'rekaa', 'rekyerɛ', 'rekyerɛa', 'rekɔ', 'rekɔda', 'rekɔfa', 'rekɔhwɛ',
  'rekɔyɛ', 'rekɔyɛa', 'rema', 'remaeɛ', 'renante', 'repɛ', 'repɛoo', 'rereba',
  'reresua', 'reserea', 'resii', 'retena', 'reto', 'retua', 'retɔa', 'retɔnn',
  'retɔnneɛ', 'rewɔaba', 'rewɔabaa', 'reyɛ', 'reyɛeɛ', 'reyɛnkɔ', 'reyɛreba',
  'reyɛreoo', 'reyɛɛ', 'wobisa', 'wobo', 'wobɔ', 'wobɔɔ', 'wobɔɔeɛ', 'wobɔɔoo',
  'wobɛ', 'woda', 'wodi', 'wodwene', 'wodɔ', 'wodɔeɛ', 'wofa', 'wofaoo', 'wofrɛ',
  'wogu', 'wogye', 'wohunu', 'wohyɛeɛ', 'woka', 'wokyerɛ', 'wokɔ', 'wokɔeɛ',
  'wokɔfaeɛ', 'wokɔhwɛ', 'wokɔyɛeɛ', 'woma', 'wonante', 'wonom', 'wonoma',
  'wopɛ', 'woreba', 'woresua', 'woresuaa', 'wosere', 'woserea', 'wosii',
  'wosiieɛ', 'wosiioo', 'woso', 'wosuaeɛ', 'wosuaoo', 'wosɔ', 'wosɔoo',
  'wotenaa', 'wotoa', 'wotuaa', 'wotɔa', 'wotɔnn', 'wowɔaba', 'woyɛ', 'woyɛnkɔ',
  'woyɛɛ', 'yɛbisa', 'yɛbo', 'yɛboa', 'yɛbrɛ', 'yɛbɔ', 'yɛbɔne', 'yɛbɔoo',
  'yɛbɛa', 'yɛbɛyɛ', 'yɛbɛyɛa', 'yɛda', 'yɛdaa', 'yɛdi', 'yɛdwene', 'yɛdweneeɛ',
  'yɛfa', 'yɛfaa', 'yɛfrɛoo', 'yɛgye', 'yɛgyeeɛ', 'yɛhyɛ', 'yɛkasa', 'yɛkyerɛ',
  'yɛkyerɛa', 'yɛkɔ', 'yɛkɔa', 'yɛkɔfa', 'yɛkɔhwɛ', 'yɛkɔtɔ', 'yɛkɔyɛ',
  'yɛnanteoo', 'yɛnom', 'yɛpɛ', 'yɛpɛoo', 'yɛreba', 'yɛrebisa', 'yɛrebo',
  'yɛrebooo', 'yɛrebrɛ', 'yɛrebɔɔ', 'yɛrebɔɔa', 'yɛrebɛ', 'yɛreda', 'yɛredaoo',
  'yɛredi', 'yɛredioo', 'yɛredwene', 'yɛredɔ', 'yɛredɔa', 'yɛrefrɛ', 'yɛregu',
  'yɛregua', 'yɛregueɛ', 'yɛregye', 'yɛrehunu', 'yɛrehunua', 'yɛrehunueɛ',
  'yɛrehyɛ', 'yɛreka', 'yɛrekaeɛ', 'yɛrekasa', 'yɛrekyerɛ', 'yɛrekɔ',
  'yɛrekɔdaa', 'yɛrekɔdaeɛ', 'yɛrekɔhwɛ', 'yɛrekɔtɔ', 'yɛrekɔyɛ', 'yɛrekɔyɛeɛ',
  'yɛrekɔyɛoo', 'yɛrema', 'yɛrenante', 'yɛrenom', 'yɛrepɛ', 'yɛrepɛeɛ', 'yɛrereba',
  'yɛreresua', 'yɛresere', 'yɛresereoo', 'yɛresii', 'yɛresiia', 'yɛreso', 'yɛresua',
  'yɛresuaa', 'yɛresuaeɛ', 'yɛretena', 'yɛretoeɛ', 'yɛretua', 'yɛretuaoo',
  'yɛretwɛna', 'yɛretɔ', 'yɛretɔnn', 'yɛrewɔaba', 'yɛreyɛ', 'yɛreyɛeɛ',
  'yɛreyɛnkɔ', 'yɛreyɛre', 'yɛreyɛreba', 'yɛreyɛrebaoo', 'yɛreyɛɛ', 'yɛserea',
  'yɛsereoo', 'yɛsii', 'yɛsiioo', 'yɛsoa', 'yɛsua', 'yɛsɔ', 'yɛtena', 'yɛtenaa',
  'yɛtenaeɛ', 'yɛtooo', 'yɛtua', 'yɛtɔa','yɛtɔnn','yɛwɔaba','yɛwɔabaa','yɛwɔabaoo', 
  'yɛyɛ','yɛyɛnkɔoo','yɛyɛre', 'yɛyɛreba', 'yɛyɛrebaeɛ', 'ɔbisa', 'ɔbo', 'ɔboa', 
  'ɔbrɛa', 'ɔbɔ', 'ɔbɔɔ', 'ɔbɛ', 'ɔbɛyɛ', 'ɔbɛyɛoo', 'ɔda', 'ɔdi', 'ɔdwene', 'ɔdɔ',
  'ɔfrɛ', 'ɔfrɛa', 'ɔgye', 'ɔgyeeɛ', 'ɔkaeɛ', 'ɔkasa', 'ɔkasaa', 'ɔkyerɛ', 'ɔkɔ',
  'ɔkɔda', 'ɔkɔhwɛ', 'ɔkɔhwɛeɛ', 'ɔkɔtɔ', 'ɔkɔyɛ', 'ɔnom', 'ɔnoma', 'ɔnomoo',
  'ɔpɛ', 'ɔresuaoo', 'ɔsere', 'ɔsii', 'ɔsua', 'ɔsɔ', 'ɔtenaoo', 'ɔtooo', 'ɔtwɛn',
  'ɔtɔ', 'ɔtɔnneɛ', 'ɔtɔnnoo', 'ɔwɔaba', 'ɔwɔabaeɛ', 'ɔwɔabaoo', 'ɔyɛ', 'ɔyɛoo',
  'ɔyɛreba', 'ɔyɛrebaeɛ', 'ɔyɛɛ','ɔyɛɛa',
  // Additional historical words
  'kɔe', 'bae', 'ba', 'reba', 'didii', 'suree', 'su', 'resu', 'penee', 'pene', 'repene', 
  'tenaa', 'tena', 'retena', 'soaa', 'sua', 'resua', 'sereee', 'sere', 'resere', 'dweene', 
  'dwene', 'redwene', 'kae', 'reka', 'tee', 'te', 'rete', 'twene', 'twɛn', 'retwɛn', 
  'gyinaa', 'gyina', 'regyina', 'hyɛɛ', 'hyɛ', 'rehyɛ', 'kɔree', 'tu', 'retu', 'tuu'
];

// Updated prefixes and suffixes based on the provided logic
const prefixes = ['re', 'bɛ', 'me', 'mɛ', 'ɔmo', 'be', 'ɛ', 'o', 'wo', 'n', 'a', 'mo', 'ɔ', 'sɛm', 'ma', 'di', 'yɛ'];
const suffixes = ['foɔ', 'dii', 'di', 'nii', 'eɛ', 'so', 'nom', 'kuo', 'ɛ', 'ɔ', 'muu', 'e', 'a', 'm', 'no', 'ni', 'kye', 'w', 'oo', 'aa'];

// Simplified lemma dictionary based on the provided logic
const lemmaDict: Record<string, string> = {
  'kɔ': 'kɔ',
  'yɛ': 'yɛ',
  'di': 'di',
  'ka': 'ka',
  'kasa': 'kasa',
  'pɛ': 'pɛ',
  'fwe': 'fwe',
  'bisa': 'bisa',
  'bo': 'bo',
  'bɔ': 'bɔ',
  'da': 'da',
  'dwene': 'dwene',
  'dɔ': 'dɔ',
  'fa': 'fa',
  'frɛ': 'frɛ',
  'gye': 'gye',
  'hunu': 'hunu',
  'hyɛ': 'hyɛ',
  'kyerɛ': 'kyerɛ',
  'nom': 'nom',
  'sere': 'sere',
  'sii': 'sii',
  'sua': 'sua',
  'sɔ': 'sɔ',
  'tena': 'tena',
  'to': 'to',
  'tua': 'tua',
  'twɛn': 'twɛn',
  'tɔ': 'tɔ',
  'wɔaba': 'wɔaba',
  'nante': 'nante',
  'resua': 'sua',
  'reba': 'ba',
  'ba': 'ba',
  'tu': 'tu',
  'te': 'te',
  'gyina': 'gyina',
  'twe': 'twe',
  'gu': 'gu'
};

// Enhanced Lemmatization function using dictionary and fallback rules
const lemmatize = (word: string): [string, string] => {
  const ruleApplied: string[] = [];
  
  // Check if word exists in dictionary first
  if (lemmaDict[word]) {
    return [lemmaDict[word], 'Dictionary lookup'];
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
  const [showWordList, setShowWordList] = useState(false);

  // Get all unique words from the dataset
  const allWords = [...new Set([...twiWords, ...Object.keys(lemmaDict)])].sort();

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
    <div className="min-h-screen bg-[var(--gradient-subtle)] py-4 px-4 sm:py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 max-w-full lg:max-w-2xl space-y-4 sm:space-y-6 md:space-y-8">
        {/* Project Caption */}
        <div className="text-center space-y-1 mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-[var(--gradient-hero)] bg-clip-text text-transparent">
            TWI LEMMATIZATION
          </h1>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Languages className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              Twi Word Analyzer
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto px-4">
            Analyze Twi words using advanced lemmatization to discover their root forms
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-[var(--shadow-soft)] border-0 mx-2 sm:mx-0">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Word Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter a Twi word"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-base sm:text-lg py-3 sm:py-6 transition-[var(--transition-smooth)] focus:shadow-[var(--shadow-focus)]"
                  aria-label="Twi word input"
                />
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  onClick={handleAnalyze} 
                  className="flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium transition-[var(--transition-smooth)]"
                  disabled={!input.trim()}
                >
                  Analyze
                </Button>
                {(input || result) && (
                  <Button 
                    onClick={handleClear} 
                    variant="outline"
                    className="px-4 sm:px-6 py-3 sm:py-6 transition-[var(--transition-smooth)]"
                    aria-label="Clear input and results"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground">
              Advanced lemmatization results will be displayed automatically
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-4 sm:space-y-6 mx-2 sm:mx-0">
            {/* Original Word Display */}
            <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center">
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground">Original Word</label>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{result.original}</p>
                </div>
              </CardContent>
            </Card>

            {/* Lemmatization Results */}
            <Card className="shadow-[var(--shadow-soft)] border-0 animate-in slide-in-from-top-2 duration-300">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  Lemmatization Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <label className="text-xs sm:text-sm font-medium text-primary">Lemma</label>
                    <p className="text-base sm:text-lg font-semibold text-foreground break-words">{result.result}</p>
                  </div>
                  <div className="p-3 bg-learning/5 rounded-lg border border-learning/20">
                    <label className="text-xs sm:text-sm font-medium text-learning">Rules Applied</label>
                    <p className="text-xs sm:text-sm text-foreground break-words">{result.rule}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <Card className="bg-accent/30 border-accent/40 mx-2 sm:mx-0">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                This tool performs advanced lemmatization on Twi words to find their accurate root forms.
              </p>
              <p className="text-xs text-muted-foreground">
                Uses an enhanced dictionary with detailed prefix and suffix mapping for precise linguistic analysis.
              </p>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Word List Panel - Mobile First Design */}
        <div className="w-full lg:w-auto">
          {/* Mobile: Full-width collapsible section */}
          <div className="lg:hidden">
            <Card className="shadow-[var(--shadow-soft)] border-0 mx-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <List className="w-5 h-5" />
                    Twi Words ({allWords.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWordList(!showWordList)}
                    className="p-2 hover:bg-accent"
                    aria-label={showWordList ? "Hide word list" : "Show word list"}
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showWordList ? 'rotate-90' : 'rotate-0'}`} />
                  </Button>
                </div>
              </CardHeader>
              {showWordList && (
                <CardContent className="pt-0">
                  <div className="max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {allWords.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInput(word);
                            const lemmaRes = analyzeWord(word);
                            setResult(lemmaRes);
                            setShowWordList(false); // Close on mobile after selection
                          }}
                          className="text-left px-2 py-1 text-sm rounded hover:bg-accent transition-colors duration-150 text-foreground break-words"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Desktop: Sidebar */}
          <div className={`hidden lg:block transition-all duration-300 ${showWordList ? 'w-80' : 'w-12'}`}>
            <Card className="h-fit sticky top-12 shadow-[var(--shadow-soft)] border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className={`flex items-center gap-2 text-lg transition-opacity duration-200 ${showWordList ? 'opacity-100' : 'opacity-0'}`}>
                    <List className="w-5 h-5" />
                    {showWordList && "Twi Words"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWordList(!showWordList)}
                    className="p-2 hover:bg-accent"
                    aria-label={showWordList ? "Hide word list" : "Show word list"}
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showWordList ? 'rotate-180' : 'rotate-0'}`} />
                  </Button>
                </div>
                {showWordList && (
                  <div className="text-sm text-muted-foreground">
                    {allWords.length} words available
                  </div>
                )}
              </CardHeader>
              {showWordList && (
                <CardContent className="pt-0">
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    {allWords.map((word, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInput(word);
                          const lemmaRes = analyzeWord(word);
                          setResult(lemmaRes);
                        }}
                        className="w-full text-left px-2 py-1 text-sm rounded hover:bg-accent transition-colors duration-150 text-foreground"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}