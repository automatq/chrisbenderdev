"use client";

import "./intro.css";

/*
 * Decides, before first paint, whether the title card plays. It runs
 * synchronously while the HTML is parsed, so a first-time visitor never sees
 * the page flash before the overlay covers it.
 *
 * Plays on every full load of the homepage, except for reduced-motion users.
 * Any click, key, scroll or swipe skips it.
 *
 * The state lives on the overlay element rather than on <html>: React resets
 * <html> attributes on the Strict Mode remount in development, which would cut
 * the intro off mid-play.
 */
const INTRO_SCRIPT = `(function(){
var el=document.currentScript&&document.currentScript.previousElementSibling;
if(!el)return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var evs=["pointerdown","keydown","wheel","touchmove"];
function off(){evs.forEach(function(n){removeEventListener(n,skip)})}
function skip(){off();if(el.dataset.state==="play")el.dataset.state="skip"}
evs.forEach(function(n){addEventListener(n,skip,{passive:true})});
el.addEventListener("animationend",function(e){if(e.target===el){off();el.dataset.state="done"}});
el.dataset.state="play";
})()`;

export default function Intro({
  title,
  tagline,
}: {
  title: string;
  tagline: string;
}) {
  return (
    <>
      {/* Decorative: the real h1 and description are in the page underneath. */}
      <div className="intro" aria-hidden="true" suppressHydrationWarning>
        <div className="intro__panel intro__panel--top">
          <div className="intro__mask intro__mask--title">
            <span className="intro__title">{title}</span>
          </div>
        </div>
        <div className="intro__panel intro__panel--bottom">
          <div className="intro__mask intro__mask--tagline">
            <span className="intro__tagline">{tagline}</span>
          </div>
          <span className="intro__skip">Skip</span>
        </div>
        <div className="intro__line" />
      </div>
      {/* Executable only in the server-rendered HTML. On a client-side
          navigation React inserts it as inert text/plain, so arriving from
          /blog shows the page straight away. */}
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }}
      />
    </>
  );
}
