const DashboardCard = ({ image, title, cta }) => (
  <div className="relative bg-b2 rounded-xl filter drop-shadow-2xl">
    <img alt="" src={image} className="w-60 rounded-t-xl" />
    <span className="absolute top-4 -left-8 px-4 py-1 bg-primary rounded-full text-sm font-medium text-dark filter drop-shadow-xl">
      {title}
    </span>
    <div className="px-2 py-4 flex gap-x-2">{cta}</div>
  </div>
);

export default DashboardCard;
