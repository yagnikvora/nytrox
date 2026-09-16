"use client";

/**
 * Hero visual: a seamlessly-looping clip (`blue2_looped.mp4`), muted + inline
 * so browsers allow autoplay.
 *
 * The clip is pure-black with a centered subject and carries a "Veo" watermark
 * in the bottom-right corner, so we:
 *   - cover just the watermark with a soft black corner patch that melts into
 *     the clip's black corner,
 *   - feather the frame edges with a radial mask and sit it on a black backdrop
 *     that fades into the space background → the video's black blends into the
 *     page instead of reading as a hard box.
 *
 * Why this is a client component: `autoPlay` alone is a request, not a promise.
 * Chrome on Android refuses it outright when Data Saver is on, and refuses it
 * again on a "low media engagement" first visit — in both cases the hero fell
 * back to an empty black rectangle, while iOS Safari (which has no equivalent
 * policy for muted inline video) played it every time. That is the single
 * biggest reason the hero looked different on the two phones. So the play
 * attempt is made explicitly, the rejection is caught, and a real control is
 * offered instead of silently showing nothing.
 */

import { useEffect, useRef, useState } from "react";

// Radial mask: opaque center, softly feathered outer edge so the frame has no
// hard rectangular border. The subject stays well inside the opaque core.
const EDGE_MASK =
  "radial-gradient(130% 130% at 50% 50%, #000 82%, transparent 100%)";

// Soft black patch anchored to the bottom-right corner (where the watermark
// sits). Solid black over the corner, fading out toward the interior so it
// blends into the clip's black instead of showing a hard swatch.
const WATERMARK_PATCH =
  "radial-gradient(circle at bottom right, #000 0%, #000 55%, transparent 100%)";

// Reframing: zoom a touch (so there are no empty gaps) then shift the clip
// left + up → crops the left edge and lifts the subject higher in the frame.
const FRAMING = "translate(-8%, -6%) scale(1.18)";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Set only when the browser has actually refused to play. */
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Belt and braces for the autoplay policy: some builds only honour these
    // when they are set as properties rather than attributes.
    video.muted = true;

    let cancelled = false;
    const attempt = () => {
      const started = video.play();
      // Older browsers return undefined rather than a promise.
      if (!started) return;
      started
        .then(() => !cancelled && setBlocked(false))
        .catch(() => !cancelled && setBlocked(true));
    };

    attempt();

    // A tab restored from the background can suspend the clip; pick it back up
    // rather than leaving a frozen frame in the hero.
    const onVisible = () => {
      if (!document.hidden && video.paused && !cancelled) attempt();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    // Inside a real user gesture, so this is allowed even under Data Saver.
    video.play().then(
      () => setBlocked(false),
      () => setBlocked(true)
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-[880px]">
      {/* black backdrop → solid black that fully covers behind the video and
          softly feathers into the space background, so the video's black reads
          as part of the page rather than a hard box. Two layers: a tight one
          guarantees full coverage right at the edges, a wide blurred one gives
          the gentle outer falloff. */}
      <div className="pointer-events-none absolute -inset-2 bg-black blur-md" />
      <div className="pointer-events-none absolute -inset-8 bg-black blur-3xl" />

      {/* video frame — no border; edges feathered so the black melts into the
          backdrop */}
      <div
        className="relative aspect-video overflow-hidden"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: FRAMING }}
          src="/videos/blue2_looped.mp4"
          autoPlay
          muted
          playsInline
          loop
          // "metadata", not "auto": the clip is 3.6 MB and this is the first
          // thing on the page. Where autoplay is allowed the browser fetches
          // what it needs anyway; where it is blocked — exactly the Android
          // case above — a phone on mobile data no longer spends 3.6 MB on a
          // video it was never going to play.
          preload="metadata"
          disablePictureInPicture
          aria-hidden={!blocked}
          tabIndex={-1}
        />

        {/* hides the "Veo" watermark in the bottom-right corner */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[30%] w-[30%]"
          style={{ background: WATERMARK_PATCH }}
        />

        {/* Shown only when the browser refused to autoplay. A quiet control
            rather than a loud one — it sits on the clip's own black, so where
            autoplay works nobody ever sees it. */}
        {blocked && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 grid place-items-center bg-black/40 text-white transition-colors hover:bg-black/25"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </span>
            <span className="sr-only">Play the showreel</span>
          </button>
        )}
      </div>
    </div>
  );
}
