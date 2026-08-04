import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./DateSingle.module.sass";
import Icon from "../Icon";
import { Chevron } from "../DateRange/Chevron";

function formatDate(date, displayFormat) {
  if (!date) return "";
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  if (displayFormat?.includes("YYYY")) {
    return `${month} ${day}, ${date.getFullYear()}`;
  }
  return `${month} ${day}`;
}

const DateSingle = ({ className, icon, description, placeholder, displayFormat, small, bodyDown }) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  return (
    <div ref={rootRef} className={cn(className, { small: small }, { bodyDown: bodyDown }, { [styles.small]: small }, styles.date)}>
      <div className={styles.head}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <Icon name={icon} size="24" />
          </div>
          {description && <div className={styles.description}>{description}</div>}
        </div>

        <input
          className={styles.input}
          readOnly
          placeholder={placeholder}
          value={formatDate(date, displayFormat)}
          onClick={() => setOpen((v) => !v)}
        />

        {open && (
          <div className={cn(styles.picker, { [styles.pickerDown]: bodyDown })}>
            <DayPicker
              mode="single"
              selected={date ?? undefined}
              onSelect={(next) => {
                setDate(next ?? null);
                setOpen(false);
              }}
              numberOfMonths={1}
              defaultMonth={date ?? new Date()}
              navLayout="around"
              components={{ Chevron }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSingle;
