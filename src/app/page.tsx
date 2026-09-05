import { NightDesk } from "@/ui/night-desk";

export default function HomePage() {
  return (
    <NightDesk clockLabel="after midnight" statusLabel="shell only · wire later" statusBad>
      <section className="col">
        <div className="col-head">rooms</div>
        <p className="empty" style={{ padding: "0 1rem 1rem" }}>
          The mix tape of conversations will live here: fire escape, kitchen, night shift.
        </p>
      </section>
      <section className="thread col">
        <div className="thread-copy">
          <h2>Leave the lamp on</h2>
          <p>Thread, composer, and who is still awake land in the next pass.</p>
        </div>
      </section>
      <aside className="col">
        <div className="col-head">still up</div>
        <p className="empty" style={{ padding: "0 1rem" }}>
          Presence dots once the socket is live.
        </p>
      </aside>
    </NightDesk>
  );
}
