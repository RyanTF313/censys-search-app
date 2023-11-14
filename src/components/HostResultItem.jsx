import { groupServices } from "../utils/group";

function HostResultItem({ result }) {
  const services = groupServices(result.services);

  return result.ip ? (
    <div
      className={"HostResult"}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className={"IpAddress"}
        style={{ color: "blue", fontSize: 24, fontWeight: "bold" }}
      >
        {result.ip}
      </div>
      <div
        className="IpServices"
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {Object.keys(services).map((service) => (
          <div
            key={service}
            style={{ color: "blue", fontSize: 18, margin: 4, width: "10%" }}
          >
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
