import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./DateRange.module.sass";
import Icon from "../Icon";

function formatDate(date, displayFormat) {
  if (!date) return "";
  // Mirrors the two display formats actually used by callers ("MMM DD" and
  // "MMM DD, YYYY", moment.js format strings react-dates used to accept) —
  // not a general moment-format parser, just the two patterns this app uses.
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  if (displayFormat?.includes("YYYY")) {
    return `${month} ${day}, ${date.getFullYear()}`;
  }
  return `${month} ${day}`;
}

const DateRange = ({
  className,
  icon,
  description,
  startDatePlaceholderText,
  endDatePlaceholderText,
  displayFormat,
  small,
  bodyDown,
  startDate: controlledStartDate,
  endDate: controlledEndDate,
  onDatesChange,
}) => {
  const [internalStartDate, setInternalStartDate] = useState(null);
  const [internalEndDate, setInternalEndDate] = useState(null);
  const startDate = controlledStartDate ?? internalStartDate;
  const endDate = controlledEndDate ?? internalEndDate;
  const [openField, setOpenField] = useState(null); // "start" | "end" | null

  const rootRef = useRef(null);

  useEffect(() => {
    if (!openField) return;
    function onOutsideClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpenField(null);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [openField]);

  function updateDates(next) {
    if (controlledStartDate === undefined) setInternalStartDate(next.startDate);
    if (controlledEndDate === undefined) setInternalEndDate(next.endDate);
    onDatesChange?.(next);
  }

  function handleSelect(range) {
    const nextStart = range?.from ?? null;
    const nextEnd = range?.to ?? null;
    updateDates({ startDate: nextStart, endDate: nextEnd });
    // Same UX react-dates had: picking a start date keeps the calendar open
    // and focused on the end date; picking a complete range closes it.
    if (nextStart && !nextEnd) setOpenField("end");
    else if (nextStart && nextEnd) setOpenField(null);
  }

  return (
    <div ref={rootRef} className={cn(className, { small: small }, { bodyDown: bodyDown }, { [styles.small]: small }, styles.date)}>
      <div className={styles.head}>
        <div className={styles.list}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <Icon name={icon} size="24" />
            </div>
            {description && <div className={styles.description}>{description}</div>}
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <Icon name={icon} size="24" />
            </div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>

        <div className={cn("rdp-input-group", styles.inputGroup)}>
          <input
            className={styles.input}
            readOnly
            placeholder={startDatePlaceholderText}
            value={formatDate(startDate, displayFormat)}
            onClick={() => setOpenField(openField === "start" ? null : "start")}
          />
          <input
            className={styles.input}
            readOnly
            placeholder={endDatePlaceholderText}
            value={formatDate(endDate, displayFormat)}
            onClick={() => setOpenField(openField === "end" ? null : "end")}
          />
        </div>

        {openField && (
          <div className={cn(styles.picker, { [styles.pickerDown]: bodyDown })}>
            <DayPicker
              mode="range"
              selected={{ from: startDate ?? undefined, to: endDate ?? undefined }}
              onSelect={handleSelect}
              numberOfMonths={2}
              defaultMonth={startDate ?? new Date()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRange;
