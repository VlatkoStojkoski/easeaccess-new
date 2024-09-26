'use client';

import { cn } from "@/utils";
import React, { useState } from "react";
import Image from "next/image";
import { AlignTextIcon, BigCursorIcon, ContrastIcon, DyslexiaIcon, HideImagesIcon, HighlightLinksIcon, LineHeightIcon, PageStructureIcon, PauseAnimationsIcon, ReadingFocusIcon, ReadingGuideIcon, ScreenReaderIcon, TextSizeIcon, TextSpacingIcon } from "@/components/icons";

const getActionHandler = (actionName: string) => function actionHandler() {
  console.log('Sending action:', actionName);
  window.parent.postMessage(JSON.stringify({
    action: actionName
  }), '*');
}

type WidgetToggleContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function WidgetToggleContainer({ children, className, ...props }: WidgetToggleContainerProps) {
  return (
    <div className={cn("w-full h-full bg-background-secondary rounded-lg p-2", className)} {...props}>
      {children}
    </div>
  );
}

type SimpleWidgetToggleProps = {
  title: string;
  icon: React.FC;
  actionName: string;
} & React.HTMLAttributes<HTMLDivElement>;

function SimpleWidgetToggle({ title, icon: Icon, className, actionName, ...props }: SimpleWidgetToggleProps) {
  return (
    <WidgetToggleContainer {...props}>
      <button className={cn('w-full h-full flex flex-col items-center justify-center gap-y-1 text-center', className)} onClick={getActionHandler(actionName)}>
        <Icon />
        <p className="text-xs">{title}</p>
      </button>
    </WidgetToggleContainer>
  );
}

type PlusMinusWidgetToggleProps = {
  title: string;
  icon: React.FC;
  actionNames: {
    minus: string;
    plus: string;
  };
} & React.HTMLAttributes<HTMLDivElement>;

function PlusMinusWidgetToggle({ title, icon: Icon, className, ...props }: PlusMinusWidgetToggleProps) {
  return (
    <WidgetToggleContainer className={cn('grid grid-cols-3 place-items-center gap-y-1 col-span-2', className)} {...props}>
      <button className="bg-background-secondary border border-black size-8 flex items-center justify-center rounded-xl" onClick={getActionHandler('decrease-font-size')}>
        -
      </button>
      <div className="flex flex-col items-center justify-center gap-y-1">
        <Icon />
        <p className="text-center text-xs">{title}</p>
      </div>
      <button className="bg-background-secondary border border-black size-8 flex items-center justify-center rounded-xl" onClick={getActionHandler('increase-font-size')}>
        +
      </button>
    </WidgetToggleContainer>
  );
}

type MultipleActionWidgetToggleProps = {
  title: string;
  icon: React.FC;
  actions: {
    title: string;
    name: string;
  }[];
} & React.HTMLAttributes<HTMLDivElement>;

function MultipleActionWidgetToggle({ title, icon: Icon, actions, className, ...props }: MultipleActionWidgetToggleProps) {
  return (
    <WidgetToggleContainer className={cn('flex flex-col items-center justify-between text-center col-span-2 row-span-2', className)} {...props}>
      <div className="flex-1 flex flex-col items-center justify-center gap-y-1">
        <Icon />
        <p>{title}</p>
      </div>

      <div className="w-full grid grid-flow-col gap-x-2 min-h-16">
        {actions.map(({ title, name }) => (
          <button key={name} className="bg-background-secondary border border-black w-full h-full flex items-center justify-center rounded-xl" onClick={getActionHandler(name)}>
            {title}
          </button>
        ))}
      </div>
    </WidgetToggleContainer>
  );
}

function IconPlaceholder() {
  return (
    <div className="size-14 bg-background flex items-center justify-center">
      X
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  async function onSearch() {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`);
    const resBody = await res.json();

    const meaning = resBody[0].meanings[0].definitions[0].definition;
    setSearchResult(meaning);
  }

  return (
    <div className="w-full h-full bg-background rounded-lg p-3 flex flex-col gap-y-3">
      <div className="relative bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg grid grid-cols-[1fr_auto_1fr]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-background-secondary px-6 py-2 rounded-b-full font-bold text-neutral-500 text-center">
          <h2>Accessibility Settings</h2>
        </div>

        <div className="justify-self-start p-3 col-start-1">
          <div className="size-8 bg-background-secondary flex items-center justify-center rounded-full">
            X
          </div>
        </div>

        <div className="justify-self-end p-3 col-start-3">
          <div className="size-8 bg-background-secondary flex items-center justify-center rounded-full">
            P
          </div>
        </div>

        <div className="w-full p-3 pt-0 col-span-full grid grid-cols-[auto_1fr_auto] mt-4">
          <button className="bg-background w-12 flex items-center justify-center rounded-l-full" onClick={onSearch}>S</button>
          <input type="text" className="w-full col-start-2 col-span-1 px-4 py-2" placeholder="Search the dictionary to clarify terms"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="bg-background w-12 flex items-center justify-center rounded-r-full">L</button>
        </div>
      </div>

      {/* export const ACCEPTED_ACTION_NAMES = [
	'increase-font-size',
	'decrease-font-size',
	'highlight-links',
	'toggle-line-height',
	'toggle-text-spacing',
	'toggle-text-alignment',
	'toggle-dyslexia-font',
	'toggle-big-cursor',
	'toggle-reading-focus',
	'toggle-reading-guide',
	'toggle-animation-play-state',
	'set-contrast-1',
	'set-contrast-2',
	'set-contrast-3',
	'toggle-page-structure',
	'toggle-images-hidden',
	'talkify-speak'
] as const; */}
      {
        searchResult && (
          <div>
            <h1 className="font-bold">{searchQuery}</h1>
            <p>{searchResult}</p>
          </div>
        )
      }

      <div className="grid grid-cols-3 gap-3 auto-rows-[theme(spacing.24)]">
        <MultipleActionWidgetToggle title="Contrast" actions={[
          { title: "1", name: "set-contrast-1" },
          { title: "2", name: "set-contrast-2" },
          { title: "3", name: "set-contrast-3" }
        ]} icon={ContrastIcon} />
        <SimpleWidgetToggle title="Screen Reader" actionName="talkify-speak" icon={ScreenReaderIcon} />
        <SimpleWidgetToggle title="Highlight Links" actionName="highlight-links" icon={HighlightLinksIcon} />
        <PlusMinusWidgetToggle title="Font Size" actionNames={{ minus: "decrease-font-size", plus: "increase-font-size" }} icon={TextSizeIcon} />
        <SimpleWidgetToggle title="Dyslexia Friendly" actionName="toggle-dyslexia-font" icon={DyslexiaIcon} />
        <SimpleWidgetToggle title="Align Text" actionName="toggle-text-alignment" icon={AlignTextIcon} />
        <SimpleWidgetToggle title="Line Height" actionName="toggle-line-height" icon={LineHeightIcon} />
        <SimpleWidgetToggle title="Text Spacing" actionName="toggle-text-spacing" icon={TextSpacingIcon} />
        <SimpleWidgetToggle title="Pause Animations" actionName="toggle-animation-play-state" icon={PauseAnimationsIcon} />
        <SimpleWidgetToggle title="Hide Images" actionName="toggle-images-hidden" icon={HideImagesIcon} />
        <SimpleWidgetToggle title="Page Structure" actionName="toggle-page-structure" icon={PageStructureIcon} />
        <SimpleWidgetToggle title="Reading Guide" actionName="toggle-reading-guide" icon={ReadingGuideIcon} />
        <SimpleWidgetToggle title="Reading Focus" actionName="toggle-reading-focus" icon={ReadingFocusIcon} />
        <SimpleWidgetToggle title="Big Cursor" actionName="toggle-big-cursor" icon={BigCursorIcon} />
      </div>

      <button className="w-full bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg p-3 text-primary-foreground font-bold">
        Reset to Default Settings
      </button>
    </div>
  );
}
