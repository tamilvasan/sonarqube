/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import * as classNames from 'classnames';
import { SourceLine } from '../../../app/types';
import Tooltip from '../../controls/Tooltip';
import { translate } from '../../../helpers/l10n';
import BubblePopupHelper from '../../common/BubblePopupHelper';

interface Props {
  duplicated: boolean;
  index: number;
  line: SourceLine;
  onPopupToggle: (x: { index?: number; line: number; name: string; open?: boolean }) => void;
  popupOpen: boolean;
  renderDuplicationPopup: (index: number, line: number) => JSX.Element;
}

export default class LineDuplicationBlock extends React.PureComponent<Props> {
  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.blur();
    this.props.onPopupToggle({
      index: this.props.index,
      line: this.props.line.line,
      name: 'duplications'
    });
  };

  handleTogglePopup = (open: boolean) => {
    this.props.onPopupToggle({
      index: this.props.index,
      line: this.props.line.line,
      name: 'duplications',
      open
    });
  };

  render() {
    const { duplicated, index, line, popupOpen } = this.props;
    const className = classNames('source-meta', 'source-line-duplications-extra', {
      'source-line-duplicated': duplicated
    });

    const cell = <div className="source-line-bar" />;

    return duplicated ? (
      <td
        className={className}
        data-index={index}
        data-line-number={line.line}
        onClick={this.handleClick}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex={0}>
        <Tooltip overlay={translate('source_viewer.tooltip.duplicated_block')} placement="right">
          {cell}
        </Tooltip>
        <BubblePopupHelper
          isOpen={popupOpen}
          popup={this.props.renderDuplicationPopup(index, line.line)}
          position="bottomright"
          togglePopup={this.handleTogglePopup}
        />
      </td>
    ) : (
      <td className={className} data-index={index} data-line-number={line.line}>
        {cell}
      </td>
    );
  }
}
