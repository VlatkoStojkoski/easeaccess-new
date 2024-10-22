'use client';

import { cn } from "@/utils";
import React, { useCallback, useState } from "react";
import { AlignTextIcon, BigCursorIcon, ContrastIcon, DyslexiaIcon, HideImagesIcon, HighlightLinksIcon, LineHeightIcon, PageStructureIcon, PauseAnimationsIcon, ReadingFocusIcon, ReadingGuideIcon, ScreenReaderIcon, TextSizeIcon, TextSpacingIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

const getActionHandler = (actionName: string, extraData?: Record<string, unknown>) => function actionHandler() {
  console.log('Sending action:', actionName);
  window.parent.postMessage(JSON.stringify({
    action: actionName,
    data: extraData ?? {}
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

type WidgetLinkProps = {
  title: string;
  href: string;
  icon: React.FC;
} & React.HTMLAttributes<HTMLDivElement>;

function WidgetLink({ title, href, className, icon: Icon, ...props }: WidgetLinkProps) {
  return (
    <WidgetToggleContainer className="bg-neutral-100" {...props}>
      <Link className={
        cn(
          'w-full h-full flex flex-col items-center justify-center gap-y-1 text-center',
          className
        )
      } href={href}>
        <p className="text-sm">{title}</p>
      </Link>
    </WidgetToggleContainer>
  );
}

type WidgetButtonProps = {
  title: string;
  icon: React.FC;
  actionName: string;
} & React.HTMLAttributes<HTMLDivElement>;

function WidgetButton({ title, icon: Icon, actionName, className, ...props }: WidgetButtonProps) {
  const handleActionClick = useCallback(() => {
    getActionHandler(actionName)();
  }, [actionName]);

  return (
    <WidgetToggleContainer id={actionName} {...props}>
      <button className={
        cn(
          'w-full h-full flex flex-col items-center justify-center gap-y-1 text-center',
          className
        )
      } onClick={handleActionClick}>
        <Icon />
        <p className="text-xs">{title}</p>
      </button>
    </WidgetToggleContainer>
  );
}

type SimpleWidgetToggleProps = {
  title: string;
  icon: React.FC;
  actionName?: string;
  actionNames?: {
    default: string;
    active: string;
  };
} & React.HTMLAttributes<HTMLDivElement>;

function SimpleWidgetToggle({ title, icon: Icon, className, actionName, actionNames, ...props }: SimpleWidgetToggleProps) {
  const [active, setActive] = useState<boolean>(false);

  const handleActionClick = useCallback(() => {
    if (actionName) {
      getActionHandler(actionName)();
      setActive(!active);
    } else if (actionNames) {
      const actionName = active ? actionNames.active : actionNames.default;
      getActionHandler(actionName)();
      setActive(!active);
    }
  }, [active, actionName, actionNames]);

  return (
    <WidgetToggleContainer id={actionName ?? actionNames?.default} className="relative" {...props}>
      <div className={
        cn(
          "absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg border-primary-500",
          active ? 'border-[3px]' : 'border-0',
        )
      }></div>
      <button className={
        cn(
          'w-full h-full flex flex-col items-center justify-center gap-y-1 text-center',
          className
        )
      } onClick={handleActionClick}>
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
  const [activeAction, setActiveAction] = useState<string | null>(null);

  function handleActionClick(actionName: string) {
    if (activeAction === actionName) {
      setActiveAction(null);
    } else {
      setActiveAction(actionName);
    }

    getActionHandler(actionName)();
  }

  return (
    <WidgetToggleContainer id={actions[0].name} className={cn('flex flex-col items-center justify-between text-center col-span-2 row-span-2 p-0', className)} {...props}>
      <div className="flex-1 flex flex-col items-center justify-center gap-y-1">
        <Icon />
        <p>{title}</p>
      </div>

      <div className="w-full grid grid-flow-col gap-x-0 min-h-14">
        {actions.map(({ title, name }, idx) => (
          <button key={name} className={
            cn(
              "bg-background-secondary border border-black w-full h-full flex items-center justify-center rounded-none border-b-0",
              idx === 0 && 'rounded-bl-xl border-l-0',
              idx === actions.length - 1 && 'rounded-br-xl border-r-0',
              activeAction === name && ' border-in border-[3px] border-primary-500'
            )
          } onClick={handleActionClick.bind(null, name)}>
            {title}
          </button>
        ))}
      </div>
    </WidgetToggleContainer>
  );
}

type MultipleActionSmallWidgetToggleProps = {
  title: string;
  icon: React.FC;
  actions: {
    title: string;
    name: string;
  }[];
  defaultActionName: string;
} & React.HTMLAttributes<HTMLDivElement>;

function MultipleActionSmallWidgetToggle({ title, icon: Icon, className, actions, defaultActionName, ...props }: MultipleActionSmallWidgetToggleProps) {
  const [activeActionIdx, setActiveActionIdx] = useState<number | null>(null);

  function handleActionClick() {
    const nextActionIdx = activeActionIdx === null ? 0 : activeActionIdx + 1;
    const nextAction = nextActionIdx === actions.length ? null : actions[nextActionIdx];
    if (nextAction) {
      setActiveActionIdx(nextActionIdx);
      getActionHandler(nextAction.name)();
    } else {
      setActiveActionIdx(null);
      getActionHandler(defaultActionName)();
    }
  }

  return (
    <WidgetToggleContainer id={defaultActionName} className="relative" {...props}>
      <div className="grid grid-flow-row pointer-events-none">
        <div className="w-full h-full bg-red-600 rounded-lg"></div>
      </div>

      <button className={
        cn(
          'w-full h-full flex flex-col items-center justify-center gap-y-1 text-center',
          className
        )
      } onClick={handleActionClick}>
        <Icon />
        <p className="text-xs">{title}</p>
      </button>

      <div className="absolute bottom-1.5 left-2 grid grid-flow-col gap-x-1 h-2 w-[calc(100%-theme(spacing.2)*2)]">
        {
          actions.map((_, idx) => (
            <div key={idx} className={cn(
              "w-full h-full bg-neutral-400 rounded-full",
              (activeActionIdx ?? -1) >= idx && 'bg-secondary-500'
            )}></div>
          ))
        }
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

export function Widget() {
  const [profilesOpen, setProfilesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  async function onSearch() {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`);
    const resBody = await res.json();

    getActionHandler('show-dictionary', {
      word: searchQuery,
      definitions: resBody
    })();
  }

  return (
    <div className="w-full h-full bg-background rounded-lg p-3 flex flex-col justify-between gap-y-3">
      <div className="relative bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg grid grid-cols-[1fr_auto_1fr]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-background-secondary px-6 py-2 rounded-b-full font-bold text-neutral-500 text-center">
          <h2>Accessibility Settings</h2>
        </div>

        <div className="justify-self-start p-3 col-start-1">
          <div className="size-8 bg-background-secondary flex items-center justify-center rounded-full">
            X
          </div>
        </div>

        <div className="justify-self-end p-3 col-start-3 cursor-pointer" onClick={() => setProfilesOpen(!profilesOpen)}>
          <div className="size-8 bg-background-secondary flex items-center justify-center rounded-full">
            <Image src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" width={22} height={22} alt="Profiles" />
          </div>
        </div>

        <div className="w-full p-3 pt-0 col-span-full grid grid-cols-[auto_1fr_auto] mt-4">
          <button className="bg-background w-12 flex items-center justify-center rounded-l-full" onClick={onSearch}>
            <Image src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png" width={20} height={20} alt="Search" />
          </button>
          <input type="text" className="w-full col-start-2 col-span-1 px-4 py-2" placeholder="Search the dictionary to clarify terms"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="bg-background w-12 flex items-center justify-center rounded-r-full">
            <Image src="https://cdn-icons-png.flaticon.com/512/484/484633.png" width={20} height={20} alt="Languages" />
          </button>
        </div>
      </div>

      {
        profilesOpen && (
          <div className="grid grid-cols-3 h-24 gap-x-3">
            <WidgetLink title="Cognitive" href="/cognitive" icon={IconPlaceholder} />
            <WidgetLink title="Dyslexia" href="/dyslexia" icon={IconPlaceholder} />
            <WidgetLink title="Blind" href="/blind" icon={IconPlaceholder} />
          </div>
        )
      }

      <div className="grid grid-cols-3 gap-3 auto-rows-[theme(spacing.28)]">
        <MultipleActionWidgetToggle title="Contrast" actions={[
          { title: "1", name: "set-contrast-1" },
          { title: "2", name: "set-contrast-2" },
          { title: "3", name: "set-contrast-3" }
        ]} icon={ContrastIcon} />
        <SimpleWidgetToggle title="Screen Reader" actionNames={
          { default: "set-speak-on", active: "set-speak-off" }
        } icon={ScreenReaderIcon} />
        <SimpleWidgetToggle title="Highlight Links" actionName="highlight-links" icon={HighlightLinksIcon} />
        <PlusMinusWidgetToggle title="Font Size" actionNames={{ minus: "decrease-font-size", plus: "increase-font-size" }} icon={TextSizeIcon} />
        <SimpleWidgetToggle title="Dyslexia Friendly" actionName="toggle-dyslexia-font" icon={DyslexiaIcon} />
        <MultipleActionSmallWidgetToggle title="Align Text" actions={[
          { title: "Justify", name: "set-align-justify" },
          { title: "Left", name: "set-align-left" },
          { title: "Center", name: "set-align-center" },
          { title: "Right", name: "set-align-right" }
        ]} defaultActionName="set-align-default" icon={AlignTextIcon} />
        <MultipleActionSmallWidgetToggle title="Line Height" actions={[
          { title: "1", name: "set-line-height-1" },
          { title: "2", name: "set-line-height-2" },
          { title: "3", name: "set-line-height-3" }
        ]} defaultActionName="set-line-height-default" icon={LineHeightIcon} />
        <MultipleActionSmallWidgetToggle title="Text Spacing" actions={[
          { title: "1", name: "set-text-spacing-1" },
          { title: "2", name: "set-text-spacing-2" },
          { title: "3", name: "set-text-spacing-3" }
        ]} defaultActionName="set-text-spacing-default" icon={TextSpacingIcon} />
        <SimpleWidgetToggle title="Pause Animations" actionName="toggle-animation-play-state" icon={PauseAnimationsIcon} />
        <SimpleWidgetToggle title="Hide Images" actionName="toggle-images-hidden" icon={HideImagesIcon} />
        <WidgetButton title="Page Structure" actionName="toggle-page-structure" icon={PageStructureIcon} />
        <SimpleWidgetToggle title="Reading Guide" actionName="toggle-reading-guide" icon={ReadingGuideIcon} />
        <SimpleWidgetToggle title="Reading Focus" actionName="toggle-reading-focus" icon={ReadingFocusIcon} />
        <SimpleWidgetToggle title="Big Cursor" actionName="toggle-big-cursor" icon={BigCursorIcon} />
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-x-4">
        <button className="w-full bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg p-3 text-primary-foreground font-bold" onClick={getActionHandler('reload')}>
          Reset to Default Settings
        </button>

        <button className="size-16 bg-red-500 rounded-full p-3 text-primary-foreground font-bold" onClick={getActionHandler('toggle-widget-open')}>
          X
        </button>
      </div>

    </div>
  );
}
