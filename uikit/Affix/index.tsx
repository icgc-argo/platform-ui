/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';

export default function Affix(props: {
  top: number;
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const element = React.createRef<HTMLDivElement>();
  let oldStyles = {
    position: '',
    top: '',
    width: '',
  };
  // Offset could make the element fixed ealier or later
  const { offset = 0 } = props;

  const checkPosition = (distanceToBody: number, width: number) => {
    const scrollTop = window.scrollY;

    if (distanceToBody - scrollTop < props.top + offset) {
      if (element.current.style.position != 'fixed') {
        for (let key in oldStyles) {
          oldStyles[key] = element.current.style[key];
        }
        element.current.style.position = 'fixed';
        element.current.style.width = width + 'px';
        element.current.style.top = props.top + 'px';
      }
    } else {
      // reset to default
      for (let key in oldStyles) {
        element.current.style[key] = oldStyles[key];
      }
    }
  };

  React.useEffect(() => {
    if (typeof window.scrollY === 'undefined') {
      // don't work in IE
      return;
    }

    const distanceToBody = window.scrollY + element.current.getBoundingClientRect().top;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        checkPosition(distanceToBody, element.current.clientWidth);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div ref={element} style={{ zIndex: 1 }} className={props.className}>
      {props.children}
    </div>
  );
}
