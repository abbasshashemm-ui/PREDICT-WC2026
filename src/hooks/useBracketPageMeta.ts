import { useEffect } from 'react';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import { useTournament } from '../context/TournamentContext';
import { createTeams, teamById } from '../data/teams';
import {
  buildBracketSeoCopy,
  buildBracketSeoUrls,
} from '../lib/bracketSeo';

function upsertMetaTag(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export function useBracketPageMeta(): void {
  const { shareId, isReadOnly } = useTournamentLayout();
  const { profile } = useSupabaseAuth();
  const { state } = useTournament();

  useEffect(() => {
    if (!shareId || !isReadOnly) return;

    const champion = teamById(createTeams(), state.snapshot.championId);
    const championName = champion?.name ?? 'TBD';
    const championFullName = champion?.fullName ?? championName;
    const userName =
      profile?.display_name?.trim() || profile?.username?.trim() || 'A fan';

    const { title, description } = buildBracketSeoCopy(userName, championFullName);
    const baseUrl = window.location.origin;
    const { pageUrl } = buildBracketSeoUrls(baseUrl, shareId);

    document.title = title;
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', pageUrl);
    upsertMetaTag('property', 'og:site_name', '2026 WC Predictions');
    upsertMetaTag('name', 'twitter:card', 'summary');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);
  }, [shareId, isReadOnly, profile, state.snapshot.championId]);
}
