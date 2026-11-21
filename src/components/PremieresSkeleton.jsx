export default function PremieresSkeleton() {
  return (
    <div className="carousel-track">
      {[1, 2, 3].map((item) => (
        <div key={item} className="skeleton-card">
          <div className="skeleton-img"></div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-line medium"></div>
        </div>
      ))}
    </div>
  );
}
