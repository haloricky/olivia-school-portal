import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { LESSON_CONTENT } from "@/data/lessonContent";
import { CURRICULUM } from "@/data/curriculum";
import { SUBJECT_BY_KEY } from "@/data/subjects";
import WorldMapGame from "./games/WorldMapGame";
import EgyptGame from "./games/EgyptGame";
import BodyGame from "./games/BodyGame";
import NumbersGame from "./games/NumbersGame";
import RulesGame from "./games/RulesGame";
import BatikGame from "./games/BatikGame";
import FeelingsGame from "./games/FeelingsGame";
import AfricaGame from "./games/AfricaGame";
import InventionsGame from "./games/InventionsGame";
import PlantGame from "./games/PlantGame";
import AdditionGame from "./games/AdditionGame";
import FamiliesGame from "./games/FamiliesGame";
import InstrumentsGame from "./games/InstrumentsGame";
import NeedsWantsGame from "./games/NeedsWantsGame";
import ContinentQuizGame from "./games/ContinentQuizGame";
import GreeceGame from "./games/GreeceGame";
import WaterCycleGame from "./games/WaterCycleGame";
import SubtractionGame from "./games/SubtractionGame";
import UNGame from "./games/UNGame";
import WorldArtGame from "./games/WorldArtGame";
import HabitsGame from "./games/HabitsGame";
import WeatherSortGame from "./games/WeatherSortGame";
import ExplorerMatchGame from "./games/ExplorerMatchGame";
import AnimalClassifyGame from "./games/AnimalClassifyGame";
import ShapeSortGame from "./games/ShapeSortGame";
import RightsMatchGame from "./games/RightsMatchGame";
import DanceMatchGame from "./games/DanceMatchGame";
import ThreeRSortGame from "./games/ThreeRSortGame";
import IslandLabelGame from "./games/IslandLabelGame";
import InventorMatchGame from "./games/InventorMatchGame";
import PlanetOrderGame from "./games/PlanetOrderGame";
import ClockReadingGame from "./games/ClockReadingGame";
import LeaderMatchGame from "./games/LeaderMatchGame";
import StorySequenceGame from "./games/StorySequenceGame";
import ScenarioSortGame from "./games/ScenarioSortGame";
import WorldMapDisplay from "./WorldMapDisplay";
function FlipCard({ en, id, index }) {
  const [flipped, setFlipped] = useState(false);
  const colors = [
    { bg: "#FF85A1", dark: "#cc5a74" },
    { bg: "#FFB347", dark: "#cc8a2e" },
    { bg: "#87CEEB", dark: "#5aa0bd" },
    { bg: "#90EE90", dark: "#5ab85a" },
    { bg: "#DDA0DD", dark: "#aa6eaa" },
    { bg: "#F4A460", dark: "#c27830" }
  ];
  const c = colors[index % colors.length];
  return <div
    data-testid={`flip-card-${index}`}
    className="cursor-pointer select-none"
    style={{ perspective: "600px", height: "120px" }}
    onClick={() => setFlipped((f) => !f)}
  >
      <div
    className="relative w-full h-full transition-transform duration-500"
    style={{
      transformStyle: "preserve-3d",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
    }}
  >
        {
    /* Front — English */
  }
        <div
    className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md"
    style={{
      backfaceVisibility: "hidden",
      backgroundColor: c.bg,
      boxShadow: `0 4px 0 ${c.dark}`
    }}
  >
          <span className="text-2xl font-extrabold text-white drop-shadow" style={{ fontFamily: "Nunito, sans-serif" }}>
            {en}
          </span>
          <span className="text-xs text-white/80 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            tap to flip
          </span>
        </div>
        {
    /* Back — Indonesian */
  }
        <div
    className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md"
    style={{
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
      backgroundColor: "#fff",
      border: `3px solid ${c.bg}`,
      boxShadow: `0 4px 0 ${c.dark}`
    }}
  >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.bg, fontFamily: "Nunito, sans-serif" }}>
            Bahasa Indonesia
          </span>
          <span className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "Nunito, sans-serif" }}>
            {id}
          </span>
        </div>
      </div>
    </div>;
}
function ComingSoonGame({ gameType }) {
  return <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="text-6xl">🎮</div>
      <h3 className="text-xl font-extrabold text-gray-700" style={{ fontFamily: "Nunito, sans-serif" }}>
        Game Coming Soon!
      </h3>
      <p className="text-gray-500 text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>
        The <span className="font-bold text-pink-400">"{gameType}"</span> game is being built.
        <br />Stay tuned, Olivia!
      </p>
      <div className="text-4xl animate-bounce">🚀</div>
    </div>;
}
function LessonPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("story");
  const week = parseInt(params.week ?? "1", 10);
  const content = LESSON_CONTENT[week];
  const lesson = CURRICULUM.find((l) => l.week === week);
  const subject = lesson ? SUBJECT_BY_KEY[lesson.subjectKey] : null;
  if (!content || !lesson) {
    return <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ fontFamily: "Nunito, sans-serif" }}>
        <div className="text-6xl">📚</div>
        <h2 className="text-2xl font-extrabold text-pink-500">Lesson not found!</h2>
        <button
      onClick={() => setLocation("/")}
      className="px-6 py-3 rounded-2xl font-bold text-white"
      style={{ backgroundColor: "#FF85A1" }}
    >
          Back to Home
        </button>
      </div>;
  }
  const tabs = [
    { key: "story", label: "Story", emoji: "\u{1F4D6}" },
    { key: "learn", label: "Learn", emoji: "\u{1F0CF}" },
    { key: "play", label: "Play", emoji: "\u{1F3AE}" },
    { key: "print", label: "Print", emoji: "\u{1F5A8}\uFE0F" }
  ];
  return <div className="min-h-screen" style={{ backgroundColor: "#FFF5F8", fontFamily: "Nunito, sans-serif" }}>
      {
    /* Header */
  }
      <div
    className="px-4 pt-6 pb-4"
    style={{ backgroundColor: subject?.bg ?? "#FFF5F8" }}
  >
        <button
    data-testid="button-back"
    onClick={() => setLocation("/")}
    className="flex items-center gap-2 text-sm font-bold mb-4 rounded-xl px-3 py-1.5 transition-all active:scale-95"
    style={{ color: subject?.color ?? "#FF85A1", backgroundColor: "rgba(255,255,255,0.6)" }}
  >
          ← Back
        </button>

        <div className="flex items-start gap-3">
          <div
    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
    style={{ backgroundColor: (subject?.color ?? "#FF85A1") + "22" }}
  >
            {subject?.emoji ?? "\u{1F4DA}"}
          </div>
          <div>
            <div
    className="text-xs font-extrabold uppercase tracking-widest mb-0.5"
    style={{ color: subject?.color ?? "#FF85A1" }}
  >
              Week {week} · {subject?.name ?? "Lesson"}
            </div>
            <h1 className="text-xl font-extrabold text-gray-800 leading-tight">
              {lesson.topic}
            </h1>
          </div>
        </div>

        {
    /* Tab bar */
  }
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1">
          {tabs.map((tab) => <button
    key={tab.key}
    data-testid={`tab-${tab.key}`}
    onClick={() => setActiveTab(tab.key)}
    className={`
                flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-extrabold text-sm
                whitespace-nowrap transition-all active:translate-y-0.5 flex-shrink-0
                ${activeTab === tab.key ? "text-white shadow-md" : "text-gray-500 bg-white/70 hover:bg-white"}
              `}
    style={activeTab === tab.key ? { backgroundColor: subject?.color ?? "#FF85A1", boxShadow: `0 3px 0 ${subject?.color ?? "#FF85A1"}99` } : {}}
  >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>)}
        </div>
      </div>

      {
    /* Content area */
  }
      <div className="px-4 py-5 max-w-2xl mx-auto">

        {
    /* ── STORY TAB ── */
  }
        {activeTab === "story" && <div className="flex flex-col gap-4">
            {
    /* Story card */
  }
            <div className="rounded-3xl p-5 bg-white shadow-sm border border-pink-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📖</span>
                <span className="text-sm font-extrabold text-pink-400 uppercase tracking-wider">Opening Story</span>
              </div>
              <p className="text-gray-700 text-base leading-relaxed font-semibold italic">
                "{content.story}"
              </p>
            </div>

            {
    /* Interactive world map for geography lessons */
  }
            {content.game_type === "continents" && <div className="rounded-3xl p-4 bg-white shadow-sm border border-blue-100">
                <WorldMapDisplay />
              </div>}

            {
    /* Teaching points */
  }
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl">💡</span>
              <h3 className="font-extrabold text-gray-700 text-base">What We Learn</h3>
            </div>
            <div className="flex flex-col gap-3">
              {content.teaching.map((point, i) => <div
    key={i}
    data-testid={`teaching-point-${i}`}
    className="flex items-start gap-3 rounded-2xl px-4 py-3 bg-white shadow-sm border border-pink-50"
  >
                  <div
    className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0 mt-0.5"
    style={{ backgroundColor: subject?.color ?? "#FF85A1" }}
  >
                    {i + 1}
                  </div>
                  <p className="text-gray-700 font-semibold text-sm leading-relaxed">{point}</p>
                </div>)}
            </div>

            {
    /* Activity */
  }
            <div className="rounded-3xl p-5 mt-2 border-2" style={{ backgroundColor: "#FFF9E6", borderColor: "#FFD700" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✏️</span>
                <span className="text-sm font-extrabold text-yellow-600 uppercase tracking-wider">Today's Activity</span>
              </div>
              <p className="text-gray-700 font-semibold text-sm leading-relaxed">{content.activity}</p>
            </div>
          </div>}

        {
    /* ── LEARN TAB ── */
  }
        {activeTab === "learn" && <div className="flex flex-col gap-4">
            <div className="text-center mb-2">
              <h3 className="text-lg font-extrabold text-gray-700">Vocabulary Flip Cards</h3>
              <p className="text-sm text-gray-400 font-semibold">Tap each card to see it in Bahasa Indonesia!</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {content.vocab.map((v, i) => <FlipCard key={v.en} en={v.en} id={v.id} index={i} />)}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 font-semibold">
              {content.vocab.length} new words this week
            </p>
          </div>}

        {
    /* ── PLAY TAB ── */
  }
        {activeTab === "play" && <div className="rounded-3xl bg-white shadow-sm border border-pink-100 p-4">
            {content.game_type === "continents" ? <WorldMapGame /> : content.game_type === "egypt" ? <EgyptGame /> : content.game_type === "body" ? <BodyGame /> : content.game_type === "numbers" ? <NumbersGame /> : content.game_type === "rules" ? <RulesGame /> : content.game_type === "batik" ? <BatikGame /> : content.game_type === "feelings" ? <FeelingsGame /> : content.game_type === "africa_animals" ? <AfricaGame /> : content.game_type === "inventions_match" ? <InventionsGame /> : content.game_type === "plant_label" ? <PlantGame /> : content.game_type === "addition_visual" ? <AdditionGame /> : content.game_type === "families_quiz" ? <FamiliesGame /> : content.game_type === "instruments_match" ? <InstrumentsGame /> : content.game_type === "needs_wants_sort" ? <NeedsWantsGame /> : content.game_type === "continent_facts_quiz" ? <ContinentQuizGame /> : content.game_type === "timeline_order" ? <GreeceGame /> : content.game_type === "cycle_sequence" ? <WaterCycleGame /> : content.game_type === "subtraction_visual" ? <SubtractionGame /> : content.game_type === "country_match" ? <UNGame /> : content.game_type === "art_style_match" ? <WorldArtGame /> : content.game_type === "habits_sort" ? <HabitsGame /> : content.game_type === "weather_sort" ? <WeatherSortGame /> : content.game_type === "explorer_match" ? <ExplorerMatchGame /> : content.game_type === "animal_classify" ? <AnimalClassifyGame /> : content.game_type === "shape_sort" ? <ShapeSortGame /> : content.game_type === "rights_match" ? <RightsMatchGame /> : content.game_type === "dance_match" ? <DanceMatchGame /> : content.game_type === "3r_sort" ? <ThreeRSortGame /> : content.game_type === "island_label" ? <IslandLabelGame /> : content.game_type === "inventor_match" ? <InventorMatchGame /> : content.game_type === "planet_order" ? <PlanetOrderGame /> : content.game_type === "clock_reading" ? <ClockReadingGame /> : content.game_type === "leader_match" ? <LeaderMatchGame /> : content.game_type === "story_sequence" ? <StorySequenceGame /> : content.game_type === "scenario_sort" ? <ScenarioSortGame /> : <ComingSoonGame gameType={content.game_type} />}
          </div>}

        {
    /* ── PRINT TAB ── */
  }
        {activeTab === "print" && <div className="flex flex-col items-center gap-6 py-6">
            <div className="w-24 h-24 rounded-3xl bg-pink-50 flex items-center justify-center text-5xl">
              🖨️
            </div>
            <div className="text-center">
              <h3 className="text-xl font-extrabold text-gray-700 mb-2">Worksheet — Week {week}</h3>
              <p className="text-gray-500 text-sm font-semibold mb-1">{lesson.topic}</p>
              <p className="text-gray-400 text-xs">Month {lesson.month} worksheet PDF</p>
            </div>
            <a
    data-testid="button-download-worksheet"
    href={content.worksheet_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-white text-lg transition-all active:translate-y-1"
    style={{ backgroundColor: "#FF85A1", boxShadow: "0 4px 0 #cc5a74" }}
  >
              <span>📥</span>
              Download Worksheet
            </a>
            <div className="rounded-2xl bg-pink-50 border border-pink-100 px-5 py-4 max-w-xs text-center">
              <p className="text-xs text-pink-400 font-bold mb-1">TODAY'S ACTIVITY</p>
              <p className="text-gray-600 text-sm font-semibold">{content.activity}</p>
            </div>
          </div>}
      </div>
    </div>;
}
export {
  LessonPage as default
};
