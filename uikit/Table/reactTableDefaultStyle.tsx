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

import { css } from '@emotion/react';

/**
 * This is the default react table styling copied
 * from react-table/react-table.css with minor tweeks:
 * - removed vendor prefixes for readability
 * - wrapping in css tag for scoping and usage in Emotion.
 *
 * This file should not be modified, any modification should be applied as
 * overrides on top. The cleanup was done for ease of exploration
 */

export default css`
  &.ReactTable {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  &.ReactTable * {
    box-sizing: border-box;
  }
  &.ReactTable .rt-table {
    flex: auto 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    border-collapse: collapse;
    overflow: auto;
  }
  &.ReactTable.has-filters .rt-table {
    opacity: 1 !important;
    min-height: 250px;
    .rt-tbody .rt-tr-group {
      max-height: 28px;
    }
  }
  &.ReactTable.has-filters.no-data .rt-table {
    margin-bottom: -185px;
    border-bottom: none;
  }
  &.ReactTable .rt-thead {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    user-select: none;
  }
  &.ReactTable .rt-thead.-headerGroups {
    background: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  &.ReactTable .rt-thead.-filters {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  &.ReactTable .rt-thead.-filters input,
  &.ReactTable .rt-thead.-filters select {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 5px 7px;
    font-size: inherit;
    border-radius: 3px;
    font-weight: normal;
    outline: none;
  }
  &.ReactTable .rt-thead.-filters .rt-th {
    border-right: 1px solid rgba(0, 0, 0, 0.02);
  }
  &.ReactTable .rt-thead.-header {
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
  }
  &.ReactTable .rt-thead .rt-tr {
    text-align: center;
  }
  &.ReactTable .rt-thead .rt-th,
  &.ReactTable .rt-thead .rt-td {
    padding: 5px 5px;
    line-height: normal;
    position: relative;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: inset 0 0 0 0 transparent;
  }
  &.ReactTable .rt-thead .rt-th.-sort-asc,
  &.ReactTable .rt-thead .rt-td.-sort-asc {
    box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.6);
  }
  &.ReactTable .rt-thead .rt-th.-sort-desc,
  &.ReactTable .rt-thead .rt-td.-sort-desc {
    box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.6);
  }
  &.ReactTable .rt-thead .rt-th.-cursor-pointer,
  &.ReactTable .rt-thead .rt-td.-cursor-pointer {
    cursor: pointer;
  }
  &.ReactTable .rt-thead .rt-th:last-child,
  &.ReactTable .rt-thead .rt-td:last-child {
    border-right: 0;
  }
  &.ReactTable .rt-thead .rt-th:focus {
    outline: none;
  }
  &.ReactTable .rt-thead .rt-resizable-header {
    overflow: visible;
  }
  &.ReactTable .rt-thead .rt-resizable-header:last-child {
    overflow: hidden;
  }
  &.ReactTable .rt-thead .rt-resizable-header-content {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  &.ReactTable .rt-thead .rt-header-pivot {
    border-right-color: #f7f7f7;
  }
  &.ReactTable .rt-thead .rt-header-pivot:after,
  &.ReactTable .rt-thead .rt-header-pivot:before {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &.ReactTable .rt-thead .rt-header-pivot:after {
    border-color: rgba(255, 255, 255, 0);
    border-left-color: #fff;
    border-width: 8px;
    margin-top: -8px;
  }
  &.ReactTable .rt-thead .rt-header-pivot:before {
    border-color: rgba(102, 102, 102, 0);
    border-left-color: #f7f7f7;
    border-width: 10px;
    margin-top: -10px;
  }
  &.ReactTable .rt-tbody {
    flex: 99999 1 auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  &.ReactTable .rt-tbody .rt-tr-group {
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  }
  &.ReactTable .rt-tbody .rt-tr-group:last-child {
    border-bottom: 0;
  }
  &.ReactTable .rt-tbody .rt-td {
    border-right: 1px solid rgba(0, 0, 0, 0.02);
  }
  &.ReactTable .rt-tbody .rt-td:last-child {
    border-right: 0;
  }
  &.ReactTable .rt-tbody .rt-expandable {
    cursor: pointer;
    text-overflow: clip;
  }
  &.ReactTable .rt-tr-group {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &.ReactTable .rt-tr {
    flex: 1 0 auto;
    display: inline-flex;
  }
  &.ReactTable .rt-th,
  &.ReactTable .rt-td {
    flex: 1 0 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 7px 5px;
    overflow: hidden;
    transition: 0.3s ease;
    transition-property: width, min-width, padding, opacity;
  }
  &.ReactTable .rt-th.-hidden,
  &.ReactTable .rt-td.-hidden {
    width: 0 !important;
    min-width: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    opacity: 0 !important;
  }
  &.ReactTable .rt-expander {
    display: inline-block;
    position: relative;
    margin: 0;
    color: transparent;
    margin: 0 10px;
  }
  &.ReactTable .rt-expander:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    border-left: 5.04px solid transparent;
    border-right: 5.04px solid transparent;
    border-top: 7px solid rgba(0, 0, 0, 0.8);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }
  &.ReactTable .rt-expander.-open:after {
    transform: translate(-50%, -50%) rotate(0);
  }
  &.ReactTable .rt-resizer {
    display: inline-block;
    position: absolute;
    width: 12px;
    top: 0;
    bottom: 0;
    right: -6px;
    cursor: col-resize;
    z-index: 10;
  }
  &.ReactTable .rt-tfoot {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  }
  &.ReactTable .rt-tfoot .rt-td {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  &.ReactTable .rt-tfoot .rt-td:last-child {
    border-right: 0;
  }
  &.ReactTable.-striped .rt-tr.-odd {
    background: rgba(0, 0, 0, 0.03);
  }
  &.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &.ReactTable .-pagination {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    padding: 3px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
  &.ReactTable .-pagination input,
  &.ReactTable .-pagination select {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 5px 7px;
    font-size: inherit;
    border-radius: 3px;
    font-weight: normal;
    outline: none;
  }
  &.ReactTable .-pagination .-btn {
    appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 3px;
    padding: 6px;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease;
    cursor: pointer;
    outline: none;
  }
  &.ReactTable .-pagination .-btn[disabled] {
    opacity: 0.5;
    cursor: default;
  }
  &.ReactTable .-pagination .-btn:not([disabled]):hover {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
  &.ReactTable .-pagination .-previous,
  &.ReactTable .-pagination .-next {
    flex: 1;
    text-align: center;
  }
  &.ReactTable .-pagination .-center {
    flex: 1.5;
    text-align: center;
    margin-bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  &.ReactTable .-pagination .-pageInfo {
    display: inline-block;
    margin: 3px 10px;
    white-space: nowrap;
  }
  &.ReactTable .-pagination .-pageJump {
    display: inline-block;
  }
  &.ReactTable .-pagination .-pageJump input {
    width: 70px;
    text-align: center;
  }
  &.ReactTable .-pagination .-pageSizeOptions {
    margin: 3px 10px;
  }
  &.ReactTable .rt-noData {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    z-index: 1;
    pointer-events: none;
    padding: 20px;
    color: rgba(0, 0, 0, 0.5);
  }
  &.ReactTable .-loading {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
  }
  &.ReactTable .-loading > div {
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 0;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.6);
    transform: translateY(-52%);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &.ReactTable .-loading.-active {
    opacity: 1;
    z-index: 2;
    pointer-events: all;
  }
  &.ReactTable .-loading.-active > div {
    transform: translateY(50%);
  }
  &.ReactTable .rt-resizing .rt-th,
  &.ReactTable .rt-resizing .rt-td {
    transition: none !important;
    cursor: col-resize;
    user-select: none;
  }
`;
