# Sqlite common commands

## Query all tables

  $ .tables;

## Query all columns in a specific table

  $ PRAGMA table_info(table_name);

## Add column in a table

  $ ALTER TABLE table_name ADD new_column_name column_definition;

## Date time functions

Source: [Date And Time Functions](https://www.sqlite.org/lang_datefunc.html)

### Function definition

  $ date(timestring, modifier, modifier, ...)
  $ time(timestring, modifier, modifier, ...)
  $ datetime(timestring, modifier, modifier, ...)

### Modifiers List

> NNN days
>
> NNN hours
>
> NNN minutes
>
> NNN.NNNN seconds
>
> NNN months
>
> NNN years
>
> start of month
>
> start of year
>
> start of day
>
> weekday N
>
> unixepoch
>
> localtime
>
> utc

### [Example] Compute the last day of the current month

  $ SELECT date('now','start of month','+1 month','-1 day');
  $ SELECT datetime('now','start of month','+1 month','-1 day');
