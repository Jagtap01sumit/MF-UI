export default function Table({
  columns,
  data,
}) {
  return (
    <table className="w-full">

      <thead>

        <tr>

          {columns.map((col) => (
            <th
              key={col.key}
              className="text-left border-b py-3"
            >
              {col.title}
            </th>
          ))}

        </tr>

      </thead>

      <tbody>

        {data.map((row, index) => (

          <tr key={index}>

            {columns.map((col) => (

              <td
                key={col.key}
                className="py-3 border-b"
              >
                {row[col.key]}
              </td>

            ))}

          </tr>

        ))}

      </tbody>

    </table>
  );
}