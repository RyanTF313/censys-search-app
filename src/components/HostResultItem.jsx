import { groupServices } from "../utils/group";

function HostResultItem({ result }) {
  const services = groupServices(result.services);

  return result.ip ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ color: "blue", fontSize: 24, fontWeight: "bold" }}>
        {result.ip}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {Object.keys(services).map((service) => (
          <div key={service} style={{ color: "blue", fontSize: 18, margin: 8 }}>
            <div>
              {services[service]} /{service}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>No IP Address</div>
  );
}

export default HostResultItem;
