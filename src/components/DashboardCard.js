const DashboardCard = ({ image, title, cta }) => (
  <div className="h-60 overflow-hidden bg-b2 rounded-xl">
    <img alt="" src={image} className="h-40" />
    <span>{title}</span>
    <div>{cta}</div>
  </div>
);

export default DashboardCard;
