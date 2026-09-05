type Props = {
  title: string;
  body: string;
};

export function QuietState({ title, body }: Props) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

type ErrorProps = {
  detail: string;
  onRetry: () => void;
};

export function WireError({ detail, onRetry }: ErrorProps) {
  return (
    <div className="banner" role="alert">
      <div>{detail}</div>
      <button type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
