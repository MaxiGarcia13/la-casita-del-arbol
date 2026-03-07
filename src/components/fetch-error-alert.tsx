export interface FetchErrorAlertProps {
  message: string;
  error?: string | null;
}

export function FetchErrorAlert({ message, error }: FetchErrorAlertProps) {
  return (
    <p className="text-charcoal/80 text-sm" role="alert">
      {message}
      {error && (
        <>
          <br />
          {error}
        </>
      )}
    </p>
  );
}
