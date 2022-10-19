/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { TOAST_VARIANTS } from '@icgc-argo/uikit';
import { useToaster } from 'global/hooks/toaster';

export default function useCommonToasters() {
  const toaster = useToaster();
  return {
    unknownError: () =>
      toaster.addToast({
        title: '',
        variant: TOAST_VARIANTS.ERROR,
        content: 'Something went wrong, please try again later or contact us for assistance.',
      }),
    unknownErrorWithReloadMessage: () =>
      toaster.addToast({
        variant: 'ERROR',
        title: 'Something went wrong',
        content: 'Uh oh! It looks like something went wrong. This page has been reloaded.',
      }),
    onSave: () =>
      toaster.addToast({
        title: 'Success!',
        variant: TOAST_VARIANTS.SUCCESS,
        content: 'Your changes have been saved.',
        interactionType: 'CLOSE',
      }),
  };
}
