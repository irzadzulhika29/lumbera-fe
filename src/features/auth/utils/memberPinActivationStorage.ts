export type MemberPinActivationSession = {
  activationChallengeId: string;
  activationToken: string;
  phoneNumber: string;
  expiresInSeconds: number;
};

const MEMBER_PIN_ACTIVATION_STORAGE_KEY = "lumbera.member-pin-activation";

export const saveMemberPinActivationSession = (
  session: MemberPinActivationSession,
) => {
  window.sessionStorage.setItem(
    MEMBER_PIN_ACTIVATION_STORAGE_KEY,
    JSON.stringify(session),
  );
};

export const getMemberPinActivationSession = () => {
  const rawValue = window.sessionStorage.getItem(
    MEMBER_PIN_ACTIVATION_STORAGE_KEY,
  );

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as MemberPinActivationSession;
  } catch {
    window.sessionStorage.removeItem(MEMBER_PIN_ACTIVATION_STORAGE_KEY);
    return null;
  }
};

export const clearMemberPinActivationSession = () => {
  window.sessionStorage.removeItem(MEMBER_PIN_ACTIVATION_STORAGE_KEY);
};
