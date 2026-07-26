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
 */

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
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: FRAMING }}
          src="/videos/blue2_looped.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />

        {/* hides the "Veo" watermark in the bottom-right corner */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[30%] w-[30%]"
          style={{ background: WATERMARK_PATCH }}
        />
      </div>
    </div>
  );
}
