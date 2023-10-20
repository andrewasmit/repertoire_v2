import './YouTube.css'

interface YoutubeParams{
  url: string;
}

const YoutubeEmbed = ({ url }:YoutubeParams) => (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        // src={`https://www.youtube.com/embed/${url}`}
        src={url}
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
);

export default YoutubeEmbed;