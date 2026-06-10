import { useState } from 'react';
import { useLinkGoogle, useLinkedProviders, useUnlinkGoogle } from 'query/Auth/useAuth';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useAccountGoogleLinkStrings } from './useAccountGoogleLinkStrings';

const GOOGLE_PROVIDER_ID = 'google.com';

export const useAccountGoogleLink = () => {
  const strings = useAccountGoogleLinkStrings();
  const addMessage = useMessagesStore(s => s.addMessage);
  const [confirmUnlink, setConfirmUnlink] = useState(false);

  const { data: providers } = useLinkedProviders();
  const googleProvider = providers?.find(p => p.providerId === GOOGLE_PROVIDER_ID);
  const isLinked = !!googleProvider;
  const googleEmail = googleProvider?.email ?? null;

  const { mutate: linkGoogle, isPending: isLinking } = useLinkGoogle();
  const { mutate: unlinkGoogle, isPending: isUnlinking } = useUnlinkGoogle();

  const handleLink = () => {
    linkGoogle(undefined, {
      onError: () => addMessage({ title: strings.genericError, body: strings.linkFailed }),
    });
  };

  const handleUnlink = () => {
    setConfirmUnlink(false);
    unlinkGoogle(undefined, {
      onError: () => addMessage({ title: strings.genericError, body: strings.unlinkFailed }),
    });
  };

  return {
    isLinked,
    googleEmail,
    isLoading: isLinking || isUnlinking,
    confirmUnlink,
    openConfirmUnlink:   () => setConfirmUnlink(true),
    cancelConfirmUnlink: () => setConfirmUnlink(false),
    handleLink,
    handleUnlink,
    strings,
  };
};
