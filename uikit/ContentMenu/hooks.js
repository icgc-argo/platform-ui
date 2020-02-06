import { useEffect, useState } from 'react';

export const useMenuHighlight = (sectionClassName, anchorClassName, topOffset) => {
  const [lastActiveLink, setLastActiveLink] = useState(undefined);
  const sections = document.getElementsByClassName(sectionClassName);
  const menuLinks = document.getElementsByClassName(anchorClassName);

  useEffect(() => {
    const findActiveSection = () => {
      if (!sections.length) return null;

      for (let i = 0; i < sections.length; i++) {
        const currentSection = sections[i];
        const { top } = currentSection.getBoundingClientRect();
        const offset = topOffset;

        if (top >= 0 && top <= offset) {
          return currentSection;
        }
      }
    };

    const highlightMenu = () => {
      const activeSection = findActiveSection();
      // highlight menu
      if (activeSection) {
        for (let i = 0; i < menuLinks.length; i++) {
          const menuLink = menuLinks[i];

          if (menuLink.id === activeSection.id) {
            // remove last active style
            if (lastActiveLink) {
              lastActiveLink.classList.remove('active');
            }
            menuLink.classList.add('active');

            setLastActiveLink(menuLink);
          }
        }
      }
    };

    document.addEventListener('scroll', highlightMenu);
    document.addEventListener('resize', highlightMenu);

    highlightMenu();

    return () => {
      document.removeEventListener('scroll', highlightMenu);
      document.removeEventListener('resize', highlightMenu);
    };
  });
};
