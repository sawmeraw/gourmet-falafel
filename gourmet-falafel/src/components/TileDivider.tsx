export default function TileDivider({ height = 40 }: { height?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height,
        backgroundImage: 'url(/misc/strip.jpg)',
        backgroundRepeat: 'repeat-x',
        backgroundSize: `auto ${height}px`,
      }}
    />
  );
}
