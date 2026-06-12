"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { twMerge } from "tailwind-merge";

export interface DateWheelPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date;
  onChange: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  locale?: string;
}

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const PERSPECTIVE_ORIGIN = ITEM_HEIGHT * 2;

function getMonthNames(locale?: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
  return Array.from({ length: 12 }, (_, i) =>
    formatter.format(new Date(2000, i, 1)),
  );
}

const sizeConfig = {
  sm: {
    itemHeight: ITEM_HEIGHT * 0.8,
    fontSize: "text-sm",
    gap: "gap-2",
  },
  md: {
    itemHeight: ITEM_HEIGHT,
    fontSize: "text-base",
    gap: "gap-4",
  },
  lg: {
    itemHeight: ITEM_HEIGHT * 1.2,
    fontSize: "text-lg",
    gap: "gap-6",
  },
} as const;

interface WheelItemProps {
  item: string | number;
  index: number;
  y: MotionValue<number>;
  itemHeight: number;
  visibleItems: number;
  centerOffset: number;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function WheelItem({
  item,
  index,
  y,
  itemHeight,
  visibleItems,
  centerOffset,
  isSelected,
  disabled,
  onClick,
}: WheelItemProps) {
  const itemY = useTransform(y, (latest) => {
    return index * itemHeight + latest + centerOffset;
  });

  const rotateX = useTransform(
    itemY,
    [0, centerOffset, itemHeight * visibleItems],
    [45, 0, -45],
  );
  const scale = useTransform(
    itemY,
    [0, centerOffset, itemHeight * visibleItems],
    [0.8, 1, 0.8],
  );
  const opacity = useTransform(
    itemY,
    [
      0,
      centerOffset * 0.5,
      centerOffset,
      centerOffset * 1.5,
      itemHeight * visibleItems,
    ],
    [0.3, 0.6, 1, 0.6, 0.3],
  );

  return (
    <motion.div
      className="flex select-none items-center justify-center"
      style={{
        height: itemHeight,
        opacity,
        rotateX,
        scale,
        transformOrigin: `center center -${PERSPECTIVE_ORIGIN}px`,
        transformStyle: "preserve-3d",
      }}
      onClick={() => !disabled && onClick()}
    >
      <span
        className={twMerge(
          "font-medium transition-colors",
          isSelected ? "text-text" : "text-text/42",
        )}
      >
        {item}
      </span>
    </motion.div>
  );
}

interface WheelColumnProps {
  items: Array<string | number>;
  value: number;
  onChange: (index: number) => void;
  itemHeight: number;
  visibleItems: number;
  disabled?: boolean;
  className?: string;
  ariaLabel: string;
}

function WheelColumn({
  items,
  value,
  onChange,
  itemHeight,
  visibleItems,
  disabled,
  className,
  ariaLabel,
}: WheelColumnProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const y = useMotionValue(-value * itemHeight);
  const centerOffset = Math.floor(visibleItems / 2) * itemHeight;
  const valueRef = React.useRef(value);
  const onChangeRef = React.useRef(onChange);
  const itemsLengthRef = React.useRef(items.length);

  React.useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
    itemsLengthRef.current = items.length;
  });

  React.useEffect(() => {
    animate(y, -value * itemHeight, {
      damping: 30,
      stiffness: 300,
      type: "spring",
    });
  }, [itemHeight, value, y]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (disabled) return;

    const projectedY = y.get() + info.velocity.y * 0.2;
    let newIndex = Math.round(-projectedY / itemHeight);
    newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
    onChange(newIndex);
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentValue = valueRef.current;
      const maxIndex = itemsLengthRef.current - 1;
      const newIndex = Math.max(0, Math.min(maxIndex, currentValue + direction));

      if (newIndex !== currentValue) {
        onChangeRef.current(newIndex);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    const maxIndex = items.length - 1;
    let newIndex = value;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        newIndex = Math.max(0, value - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        newIndex = Math.min(maxIndex, value + 1);
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = maxIndex;
        break;
      case "PageUp":
        e.preventDefault();
        newIndex = Math.max(0, value - 5);
        break;
      case "PageDown":
        e.preventDefault();
        newIndex = Math.min(maxIndex, value + 5);
        break;
      default:
        return;
    }

    if (newIndex !== value) onChange(newIndex);
  };

  const dragConstraints = React.useMemo(
    () => ({
      bottom: 0,
      top: -(items.length - 1) * itemHeight,
    }),
    [itemHeight, items.length],
  );

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "relative overflow-hidden",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={{ height: itemHeight * visibleItems }}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      role="spinbutton"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-valuemax={items.length - 1}
      aria-valuemin={0}
      aria-valuenow={value}
      aria-valuetext={String(items[value])}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
          height: centerOffset,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          height: centerOffset,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 z-[5] rounded-[10px] border-y border-[#d7dbe0] bg-primary/5"
        style={{
          height: itemHeight,
          top: centerOffset,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="cursor-grab active:cursor-grabbing"
        style={{
          paddingBottom: centerOffset,
          paddingTop: centerOffset,
          y,
        }}
        drag="y"
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, index) => (
          <WheelItem
            key={`${item}-${index}`}
            item={item}
            index={index}
            y={y}
            itemHeight={itemHeight}
            visibleItems={visibleItems}
            centerOffset={centerOffset}
            isSelected={index === value}
            disabled={disabled}
            onClick={() => onChange(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const DateWheelPicker = React.forwardRef<HTMLDivElement, DateWheelPickerProps>(
  (
    {
      value,
      onChange,
      minYear = 1920,
      maxYear = new Date().getFullYear(),
      size = "md",
      disabled = false,
      locale,
      className,
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size];
    const months = React.useMemo(() => getMonthNames(locale), [locale]);
    const years = React.useMemo(() => {
      const result: number[] = [];
      for (let year = maxYear; year >= minYear; year -= 1) {
        result.push(year);
      }
      return result;
    }, [maxYear, minYear]);

    const [dateState, setDateState] = React.useState(() => {
      const currentDate = value || new Date();
      return {
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      };
    });

    const isInternalChange = React.useRef(false);

    const days = React.useMemo(() => {
      const daysInMonth = getDaysInMonth(dateState.year, dateState.month);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [dateState.month, dateState.year]);

    const handleDayChange = React.useCallback((dayIndex: number) => {
      isInternalChange.current = true;
      setDateState((prev) => ({ ...prev, day: dayIndex + 1 }));
    }, []);

    const handleMonthChange = React.useCallback((monthIndex: number) => {
      isInternalChange.current = true;
      setDateState((prev) => {
        const daysInNewMonth = getDaysInMonth(prev.year, monthIndex);
        return {
          ...prev,
          day: Math.min(prev.day, daysInNewMonth),
          month: monthIndex,
        };
      });
    }, []);

    const handleYearChange = React.useCallback(
      (yearIndex: number) => {
        isInternalChange.current = true;
        setDateState((prev) => {
          const year = years[yearIndex];
          const daysInNewMonth = getDaysInMonth(year, prev.month);
          return {
            ...prev,
            day: Math.min(prev.day, daysInNewMonth),
            year,
          };
        });
      },
      [years],
    );

    React.useEffect(() => {
      if (!isInternalChange.current) return;
      onChange(new Date(dateState.year, dateState.month, dateState.day));
      isInternalChange.current = false;
    }, [dateState, onChange]);

    const yearIndex = years.indexOf(dateState.year);

    return (
      <div
        ref={ref}
        className={twMerge(
          "flex items-center justify-center",
          config.fontSize,
          config.gap,
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        style={{ perspective: "1000px" }}
        role="group"
        aria-label="Date picker"
        {...props}
      >
        <WheelColumn
          items={days}
          value={dateState.day - 1}
          onChange={handleDayChange}
          itemHeight={config.itemHeight}
          visibleItems={VISIBLE_ITEMS}
          disabled={disabled}
          className="w-16"
          ariaLabel="Select day"
        />
        <WheelColumn
          items={months}
          value={dateState.month}
          onChange={handleMonthChange}
          itemHeight={config.itemHeight}
          visibleItems={VISIBLE_ITEMS}
          disabled={disabled}
          className="w-28"
          ariaLabel="Select month"
        />
        <WheelColumn
          items={years}
          value={yearIndex >= 0 ? yearIndex : 0}
          onChange={handleYearChange}
          itemHeight={config.itemHeight}
          visibleItems={VISIBLE_ITEMS}
          disabled={disabled}
          className="w-20"
          ariaLabel="Select year"
        />
      </div>
    );
  },
);

DateWheelPicker.displayName = "DateWheelPicker";

export { DateWheelPicker };
