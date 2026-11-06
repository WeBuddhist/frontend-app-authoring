import React from 'react';
import { Badge, Dropdown, Icon } from '@openedx/paragon';

interface CreateToolMenuItemProps {
  icon: React.ComponentProps<typeof Icon>['src'];
  title: React.ReactNode;
  description: React.ReactNode;
  /** Short label shown next to the title, e.g. "New" */
  badge?: React.ReactNode;
  /** Link to the tool (for tools that live in another MFE) */
  href?: string;
  /** Click handler (for tools that open in this page) */
  onClick?: () => void;
}

/**
 * One tool in the "Create with a tool" menu of the empty course outline.
 * Exported so that plugins inserted into CourseOutlineCreateToolsSlot look the same as the default tools.
 * Styles: brand-openedx paragon/_authoring.scss.
 */
const CreateToolMenuItem = ({
  icon,
  title,
  description,
  badge,
  href,
  onClick,
}: CreateToolMenuItemProps) => (
  <Dropdown.Item href={href} onClick={onClick} className="create-tools-menu__item">
    <Icon src={icon} className="create-tools-menu__item-icon" />
    <span className="create-tools-menu__item-text">
      <span className="create-tools-menu__item-title">
        {title}
        {badge && <Badge variant="info" className="create-tools-menu__item-badge">{badge}</Badge>}
      </span>
      <span className="create-tools-menu__item-description">{description}</span>
    </span>
  </Dropdown.Item>
);

export default CreateToolMenuItem;
