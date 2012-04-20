require 'rubygems'
require 'sinatra'

require 'erubis'
require 'cgi'

# We don't actually have any cookies to steal, but still a good practice
set :erubis, :escape_html => true

get "/" do
  # Device gets passed through as mi_type
  @device = params[:mi_type]. to_s

  # Location information
  city    = params[:mi_city]. to_s
  reg     = params[:mi_reg].  to_s # region (state)
  cc      = params[:mi_cc].   to_s # country code, e.g. US
  @lat    = params[:mi_lat].  to_f # latitude
  @lon    = params[:mi_lon].  to_f # longitude

  # You can pass arbitrary parameters through via the embed code image src
  @name   = params[:name]

  # full user-agent string, uri-encoded
  agent   = CGI::unescape(params[:mi_agent].to_s)
  # timezone
  tz      = CGI::unescape(params[:mi_tz].to_s)

  @location = city
  if ['US'].include?(cc)
    @location << ", #{reg}"
  end

  if tz and tz != ""
    Time.zone = tz
    time = Time.zone.now
  else
    time = Time.now
  end

  @time = time.strftime("%A, %B %d#{ordinalize(time.day)}, " +
                        "%Y at #{time.strftime('%I').to_i.to_s}:%M:%S %p")

  render :erubis, :index
end

def ordinalize(day)
  case day.to_i % 10
    when 1 then "st"
    when 2 then "nd"
    when 3 then "rd"
    else "th"
  end
end
