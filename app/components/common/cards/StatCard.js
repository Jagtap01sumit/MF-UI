import Card from "./Card";

export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <Card>

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        {icon}

      </div>

    </Card>
  );
}