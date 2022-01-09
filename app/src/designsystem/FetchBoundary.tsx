interface FetchBoundaryProps {
  loading: boolean;
  skeleton?: JSX.Element;
  children: JSX.Element | null;
}

export function FetchBoundary({
  loading,
  skeleton,
  children,
}: FetchBoundaryProps) {
  return loading ? skeleton ?? children : children;
}
