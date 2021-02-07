import React from "react";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import moment from "moment";

class MainCalendar extends React.Component {
  state = {
    date: moment().format("MMM DD, YYYY"),
    markedDates: {},
    reminderDates: {},
  };

  componentDidMount() {
    const today = moment().format("YYYY-MM-DD");

    let markedDates = {};

    if (this.props.date) {
      this.setState({ date: moment(this.props.date).format("MMM DD, YYYY") });
      markedDates[this.props.date] = { selected: true };
    } else {
      markedDates[today] = { selected: true };
    }

    this.props.reminders.forEach((reminder) => {
      let date = moment(reminder.date).format("YYYY-MM-DD");
      if (moment().isBefore(date)) {
        markedDates[date] = {
          marked: true,
        };
      }
    });

    this.setState({ reminderDates: markedDates, markedDates });
  }

  getSelectedDayEvents = (date) => {
    const today = moment().format("YYYY-MM-DD");

    let markedDates = {
      ...this.state.reminderDates,
    };

    markedDates[today] = {
      selected: false,
    };

    if (this.props.date) {
      markedDates[this.props.date] = {
        selected: false,
      };
    }

    markedDates[date] = {
      selected: true,
      color: Colors.primaryColor,
      textColor: "black",
    };
    let serviceDate = moment(date).format("MMM DD, YYYY");
    this.setState({
      date: serviceDate,
      markedDates,
    });
  };

  handleDayChange = (day) => {
    this.getSelectedDayEvents(day.dateString);
    this.setState({
      date: moment(day.dateString).format("MMM DD, YYYY"),
    });
    this.props.setDate(moment(day.dateString).format("MMM DD, YYYY"));
  };

  render() {
    return (
      <Calendar
        {...this.props}
        enableSwipeMonths={true}
        onDayPress={(day) => {
          this.handleDayChange(day);
        }}
        style={{ marginBottom: 20 }}
        theme={{
          selectedDayBackgroundColor: Colors.primaryColor,
          todayTextColor: Colors.primaryColor,
          dotColor: Colors.primaryColor,
          selectedDotColor: Colors.primaryColor,
          indicatorColor: Colors.primaryColor,
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        markedDates={this.state.markedDates}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(mapStateToProps)(MainCalendar);
