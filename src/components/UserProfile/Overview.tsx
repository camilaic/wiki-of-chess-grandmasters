import "./overview.css";

interface OverviewProps {
  isStreamer: boolean;
  league: string;
  playerId: number;
  status: string;
  streamingPlatforms: string[];
  title: string;
  url: string;
  verified: boolean;
}

function Overview(props: OverviewProps) {
  const {
    title,
    league,
    playerId,
    status,
    url,
    verified,
    isStreamer,
    streamingPlatforms,
  } = props;

  return (
    <div className="overview">
      <p>Overview</p>
      <div>Title: {title}</div>
      <div>League: {league}</div>
      <div>Player id: {playerId}</div>
      <div>Status: {status}</div>
      <div>More details: {<a href={`${url}`}>{url}</a>}</div>
      <div>Verified: {verified ? "Yes" : "No"}</div>
      <div>Streamer: {isStreamer ? "Yes" : "No"}</div>
      <div>
        Streaming Platforms:{" "}
        {streamingPlatforms.length > 0
          ? streamingPlatforms.map((platform, index) => {
              return <span key={index}>{(index ? ", " : "") + platform}</span>;
            })
          : "None"}
      </div>
    </div>
  );
}

export default Overview;
