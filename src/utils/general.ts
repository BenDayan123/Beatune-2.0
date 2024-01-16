// export const url = "http://localhost:4000";
export const url = "https://beatune-backend.adaptable.app";

export function IsEmpty(obj: object) {
  for (var _ in obj) return false;
  return true;
}

export function generateUUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
