import Hex from "./Hex";

/**
 * Fixed, low-opacity backdrop: grid lines + a few floating hexagons.
 * Sits behind page content on the hero / key sections.
 */
export default function HexField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-hexgrid">
      <div className="absolute -top-6 left-[8%] floaty">
        <Hex size={70} strokeOpacity={0.35} />
      </div>
      <div className="absolute top-[20%] right-[10%] floaty-slow floaty-delay">
        <Hex size={110} strokeOpacity={0.25} />
      </div>
      <div className="absolute bottom-10 left-[20%] floaty-slow">
        <Hex size={50} strokeOpacity={0.3} />
      </div>
      <div className="absolute bottom-[15%] right-[22%] floaty floaty-delay">
        <Hex size={90} strokeOpacity={0.2} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss" />
    </div>
  );
}
