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

import * as React from 'react';
import PropTypes from 'prop-types';
import Notification, {
  NOTIFICATION_INTERACTION,
  NOTIFICATION_VARIANTS,
  NOTIFICATION_SIZES,
} from '../Notification';

export const BANNER_VARIANTS = NOTIFICATION_VARIANTS;
export const BANNER_SIZE = NOTIFICATION_SIZES;

function Banner({
  title,
  content,
  variant,
  size,
  ...otherProps
}: React.ComponentProps<typeof Notification> & {
  title?: React.ReactNode;
  content?: React.ReactNode;
  variant?: keyof typeof BANNER_VARIANTS;
  size?: keyof typeof BANNER_SIZE;
}) {
  return (
    <Notification
      noShadow
      interactionType={NOTIFICATION_INTERACTION.NONE}
      title={title}
      content={content}
      variant={variant}
      size={size}
      {...otherProps}
    />
  );
}

export default Banner;
