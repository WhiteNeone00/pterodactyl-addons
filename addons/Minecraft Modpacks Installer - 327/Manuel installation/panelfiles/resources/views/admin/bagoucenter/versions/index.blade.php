@extends('layouts.admin')

@section('title')
    Version Checker
@endsection

@section('content-header')
    <h1>Whee Service Hub<small>Manage all Whee Service addons.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Whee Service Hub</li>
    </ol>
@endsection

@section('content')
@include('admin.bagoucenter.nav')

    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title"><i class="fa fa-code-branch"></i> Version Checker</h3>
                    <div class="box-tools pull-right">
                        <form method="POST" style="display: inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-primary"><i class="fa fa-refresh"></i> Refresh</button>
                        </form>
                    </div>
                </div>
                <div class="box-body table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th style="width: 30%;">Addon Name</th>
                                <th style="width: 15%;">Installed</th>
                                <th style="width: 15%;">Latest</th>
                                <th style="width: 25%;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($addonslist as $addon)
                                @php
                                    $license = collect($licenses)->first(fn($l) => $l->addon == $addon['id']);
                                @endphp
                                @if ($license)
                                    <tr>
                                        <td>
                                            <strong>{{ $addon['name'] }}</strong>
                                        </td>
                                        <td>
                                            <code>{{ $license->version }}</code>
                                        </td>
                                        <td>
                                            <code>{{ $addon['version'] }}</code>
                                        </td>
                                        <td>
                                            @if ($addon['version'] == $license->version)
                                                <span class="label label-success"><i class="fa fa-check"></i> Up to date</span>
                                            @else
                                                <span class="label label-warning"><i class="fa fa-exclamation-triangle"></i> Update available</span>
                                            @endif
                                        </td>
                                    </tr>
                                @endif
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center text-muted">
                                        <i class="fa fa-inbox"></i> No addons installed
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
