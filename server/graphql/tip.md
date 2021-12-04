# Queries for graphql

## Basic Query

```
{
  debugMessage
  # finTopList {
  #   id,
  #   comment,
  #   amount
  #   rating {
  #     id
  #     positiveComment
  #   }
  # }
  fin(id: "DC6C3140-E9A9-4118-921E-4B371270AFE6") {
    id
    amount
    place
    date
    rating {
      id
      rating
      positiveComment
      negativeComment
    }
  }
}

# mutation {
#   debugMessage
# }
```

## Mutations

### createFullFinItem

```
createFullFinItem(finInput: {
  category: "生活"
  subcategory: "生活用品"
  comment: "test"
  date: "2021-07-02 17:34:37"
  amount: 12.3
  isScheduled: 0
  place: "test"
  city: "上海"
  tags: ""
}, ratingInput: {
  rating: 0
  positiveComment: ""
  negativeComment: "bad"
}) {
  id
  amount
  place
  date
  rating {
    id
    positiveComment
    negativeComment
  }
}
```

### createScheduledFullFinItem

```
createScheduledFullFinItem(finInput: {
  category: "生活"
  subcategory: "生活用品"
  comment: "test"
  date: "2021-07-02 17:34:37"
  amount: 12.3
  isScheduled: 4
  place: "test"
  city: "上海"
  tags: ""
}, ratingInput: {
  rating: 0
  positiveComment: ""
  negativeComment: "bad"
})s
```

### finByScheduleIdAndBaseDatetime

```
finByScheduleIdAndBaseDatetime(
  scheduleId: "7783B6F6-62E8-44CD-8E54-ABAF6664C6B9"
  year: 2100
  month: 8
  day: 6
) {
  id
}
```

### deleteFullFinItemByScheduleId

```
deleteFullFinItemByScheduleId(
  scheduleId: "7783B6F6-62E8-44CD-8E54-ABAF6664C6B9"
  year: 2100
  month: 8
  day: 6
)
```