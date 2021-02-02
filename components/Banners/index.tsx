import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LOCAL_STORAGE_BANNERS_KEY } from 'global/constants';
import BANNERS_QUERY from './BANNERS.gql';

type Banner = {
  dismissable: boolean;
  id: string;
  level: 'error' | 'info' | 'warning';
  message?: string;
  title: string;
}

type BannerProps = {
  banner: Banner;
  handleClose: (bannerId: string) => any;
}

const getLocalStorage = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_BANNERS_KEY)) || [];

const setLocalStorage = (bannerId: string) => {
  const bannerIds = getLocalStorage();
  localStorage.setItem(LOCAL_STORAGE_BANNERS_KEY, JSON.stringify(bannerIds.concat(bannerId)));
}

const useBannersQuery = (options = {}) => useQuery(
  BANNERS_QUERY,
  { ...options }
);

const Banner = ({ banner, handleClose }: BannerProps) => (
  <div className={`banner-${banner.level}`}>
    <h3>{banner.title}</h3>
    <div>{banner.message}</div>
    {banner.dismissable && (
      <button onClick={handleClose(banner.id)}>x</button>
    )}
  </div>
);

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [dismissedBannerIds, setDismissedBannerIds] = useState([]);

  useEffect(() => {
    const localDismissedBannerIds = getLocalStorage();
    setDismissedBannerIds(localDismissedBannerIds);
  }, []);

  const handleClose = (bannerId: string) => {
    setDismissedBannerIds(dismissedBannerIds.concat(bannerId));
    setLocalStorage(bannerId);
  };

  const { data = null, loading = true } = useBannersQuery({
    onCompleted: (data: any) => setBanners(data ? data.banners : []),
  });

  const visibleBanners = banners.filter(({ id }) => !dismissedBannerIds.includes(id));

  return data && !loading
    ? (
      <div>
        {visibleBanners.map(banner => <Banner banner={banner} handleClose={handleClose} />)}
      </div>
    )
    : null;
}

export default Banners;